import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

import { ENV } from "./env";

export default async function firebaseInitialize() {
  const firebaseServiceAccount = JSON.parse(ENV.FIREBASE_SERVICE_ACCOUNT);

  if (getApps().length <= 0) {
    initializeApp({
      credential: cert(firebaseServiceAccount),
    });
  }

  return {
    firestoreDB: getFirestore(),
    firebaseAuth: getAuth(),
  };
}
