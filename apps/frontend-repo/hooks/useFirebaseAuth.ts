"use client";
import firebaseInitialize from "@/configs/firebase";
import { login, logout } from "@/store/slices/usersSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export function useFirebaseAuth() {
  const { auth } = firebaseInitialize();
  const userState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const authStateHandler = async () => {
    await auth.authStateReady();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return dispatch(logout());
    }

    const userIdToken = await currentUser.getIdToken();

    dispatch(
      login({
        user: {
          id: currentUser.uid,
          name: currentUser.displayName ?? "",
          email: currentUser.email ?? "",
          avatar: "",
          created_at: "",
          updated_at: "",
        },
        idToken: userIdToken,
      })
    );
  };

  const signInUser = async (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userData = userCredential.user;
        const idToken = await userData.getIdToken();
        dispatch(
          login({
            user: {
              id: userData.uid,
              name: userData.displayName ?? "",
              email: "",
              avatar: "",
              created_at: "",
              updated_at: "",
            },
            idToken,
          })
        );

        return { success: true, message: "Login Success", error: null };
      })
      .catch((err) => {
        return { success: false, message: "Login Failed", error: err };
      });
  };

  const logoutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      return { success: true, message: "Logout Success", error: null };
    } catch (err) {
      return {
        success: false,
        message: "Logout Failed",
        error: err,
      };
    }
  };

  return {
    auth,
    userState,
    authStateHandler,
    signInUser,
    logoutUser,
  };
}
