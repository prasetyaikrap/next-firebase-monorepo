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
      throw new InvariantError(`User is already exist`);
    case "auth/id-token-expired":
    case "auth/id-token-revoked":
      throw new AuthenticationError("ID Token has been expired / revoked");
    case "auth/invalid-id-token":
      throw new AuthenticationError("ID Token Invalid");
    default:
      throw new InvariantError(error.message);
  }
}
