import { Auth, FirebaseAuthError, UserRecord } from "firebase-admin/auth";
import {
  CollectionReference,
  FieldValue,
  Filter,
  Firestore,
  Timestamp,
} from "firebase-admin/firestore";
import AuthorizationError from "../utils/exceptions/AuthorizationError";
import InvariantError from "../utils/exceptions/InvariantError";
import {
  convertTimestampToDateString,
  firebaseAuthError,
} from "../utils/firebase";
import { ENV } from "../config/env";
import AuthenticationError from "../utils/exceptions/AuthenticationError";

type AuthenticationsRepositoryProps = {
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

type VerifyIdTokenProps = {
  idToken: string;
};
type VerifyClientIdProps = {
  clientId: string;
};

type VerifyUserOwnerProps = {
  userId: string;
  credentialUserId: string;
};

export default class AuthenticationsRepository {
  public _firebaseAuth: AuthenticationsRepositoryProps["firebaseAuth"];

  constructor({ firebaseAuth }: AuthenticationsRepositoryProps) {
    this._firebaseAuth = firebaseAuth;
  }

  async verifyIdToken({ idToken }: VerifyIdTokenProps) {
    const decodedToken = await this._firebaseAuth.verifyIdToken(idToken);

    return {
      userId: decodedToken.uid,
    };
  }

  async verifyClientId({ clientId }: VerifyClientIdProps) {
    if (clientId !== ENV.CLIENT_ID)
      throw new AuthenticationError("Invalid Client Id");

    return {
      clientId,
    };
  }

  async verifyUserOwner({ userId, credentialUserId }: VerifyUserOwnerProps) {
    const isOwner = userId === credentialUserId;
    if (!isOwner)
      throw new AuthorizationError(
        "Forbidden. you dont have access to the resource"
      );
  }
}
