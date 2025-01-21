import { FirebaseAuthError } from "firebase-admin/auth";
import { Timestamp } from "firebase-admin/firestore";
import InvariantError from "./exceptions/InvariantError";
import AuthenticationError from "./exceptions/AuthenticationError";

export function convertTimestampToDate(value: Timestamp) {
  return value.toDate();
}

export function convertTimestampToDateString(value: Timestamp) {
  return value.toDate().toISOString();
}

export function convertDateToTimestamp(value: Date) {
  return Timestamp.fromDate(value);
}

export function firebaseAuthError(error: FirebaseAuthError) {
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
    default:
      return {
        code: 400,
        message: error.message,
        error,
      };
  }
}
