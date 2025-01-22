import { Timestamp } from "firebase-admin/firestore";

export function convertTimestampToDate(value: Timestamp) {
  return value.toDate();
}

export function convertTimestampToDateString(value: Timestamp) {
  return value.toDate().toISOString();
}

export function convertDateToTimestamp(value: Date) {
  return Timestamp.fromDate(value);
}
