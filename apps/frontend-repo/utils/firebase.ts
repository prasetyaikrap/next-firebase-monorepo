import { FirebaseError } from "firebase/app";

export function firebaseAuthError(error: FirebaseError) {
  switch (error.code) {
    case "auth/user-not-found":
      return {
        code: 400,
        message: `User not found. Try sign in with registered email`,
        error,
      };
    case "auth/wrong-password":
      return {
        code: 400,
        message: `Password is wrong. Try Again`,
        error,
      };
    default:
      return {
        code: 400,
        message: error.message,
        error,
      };
  }
}
