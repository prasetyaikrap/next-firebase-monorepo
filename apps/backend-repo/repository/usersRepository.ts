import { Auth, FirebaseAuthError, UserRecord } from "firebase-admin/auth";
import {
  CollectionReference,
  FieldValue,
  Firestore,
  Timestamp,
} from "firebase-admin/firestore";
import NotFoundError from "../utils/exceptions/NotFoundError";
import InvariantError from "../utils/exceptions/InvariantError";
import {
  convertTimestampToDateString,
  firebaseAuthError,
} from "../utils/firebase";

type UsersRepositoryProps = {
  firestore: Firestore;
  firebaseAuth: Auth;
};

export type UsersCollectionDoc = {
  username: string;
  name: string;
  email: string;
  avatar: string;
  user_search: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
};

type AddUserProps = {
  username: string;
  name: string;
  email: string;
  password: string;
};
type GetUserByIdProps = {
  userId: string;
};
type UpdateUserByIdProps = {
  userId: string;
  payload: {
    name: string;
    avatar: string;
    email: string;
  };
};

export default class UsersRepository {
  public _firebaseAuth: UsersRepositoryProps["firebaseAuth"];
  public _firestore: UsersRepositoryProps["firestore"];
  public _userCollectionRef: CollectionReference;

  constructor({ firestore, firebaseAuth }: UsersRepositoryProps) {
    this._firebaseAuth = firebaseAuth;
    this._firestore = firestore;
    this._userCollectionRef = this._firestore.collection("admins");
  }

  async addUser(payload: AddUserProps) {
    const { username, email, name, password } = payload;
    const userRecord = await this._firebaseAuth.createUser({
      displayName: name,
      email,
      password,
    });
    const userSearchName = name
      .toLowerCase()
      .split(" ")
      .map((v) => v.trim());
    const userSearchEmail =
      email
        .toLowerCase()
        .split("@")[0]
        ?.split(".")
        .map((v) => v.trim()) || [];

    const userSearch = [...userSearchName, ...userSearchEmail];
    const snapshot = await this._userCollectionRef.doc(userRecord.uid).set({
      username,
      name,
      email,
      avatar: "",
      user_search: userSearch,
      created_at: FieldValue.serverTimestamp(),
      updated_at: FieldValue.serverTimestamp(),
    });

    if (!snapshot.isEqual) {
      new InvariantError(
        `Failed to create user, something wrong with firestore instance`
      );
    }

    return {
      id: userRecord.uid,
    };
  }

  async getUserById({ userId }: GetUserByIdProps) {
    const snapshot = await this._userCollectionRef.doc(userId).get();

    if (!snapshot.exists) {
      throw new NotFoundError("User Not Found");
    }

    const userData = snapshot.data() as UsersCollectionDoc;

    return {
      ...userData,
      id: snapshot.id,
      created_at: convertTimestampToDateString(userData.created_at),
      updated_at: convertTimestampToDateString(userData.updated_at),
    };
  }

  async updateUserById({ userId, payload }: UpdateUserByIdProps) {
    await this._firebaseAuth.updateUser(userId, {
      displayName: payload.name,
      email: payload.email,
    });

    const userSearchName = payload.name
      .toLowerCase()
      .split(" ")
      .map((v) => v.trim());
    const userSearchEmail =
      payload.email
        .toLowerCase()
        .split("@")[0]
        ?.split(".")
        .map((v) => v.trim()) || [];

    const userSearch = [...userSearchName, ...userSearchEmail];
    const snapshot = await this._userCollectionRef.doc(userId).update({
      ...payload,
      updated_at: FieldValue.serverTimestamp(),
      user_search: FieldValue.arrayUnion(...userSearch),
    });

    if (!snapshot.isEqual) {
      throw new InvariantError("Failed to update user information");
    }

    return {
      id: userId,
    };
  }
}
