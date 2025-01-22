import { FirebaseAuthError } from "firebase-admin/auth";
import { FirebaseError } from "firebase/app";

export function firebaseAuthError(error: FirebaseAuthError | FirebaseError) {
  switch (error.code) {
    case "auth/email-already-exists":
    case "auth/uid-already-exists":
      return {
        code: 400,
        message: `User is already exist`,
        error,
      };
    case "auth/id-token-expired":
    case "auth/id-token-revoked":
      return {
        code: 401,
        message: `ID Token has been expired / revoked`,
        error,
      };
    case "auth/invalid-id-token":
    case "auth/argument-error":
      return {
        code: 401,
        message: `ID Token Invalid`,
        error,
      };
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
