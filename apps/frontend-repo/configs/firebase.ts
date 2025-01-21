"use client";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { ENV } from "./env";

export default function firebaseInitialize() {
  const firebaseClientConfig = JSON.parse(ENV.NEXT_PUBLIC_FIREBASE_CONFIG);

  const app = () => {
    const currentApps = getApps();
    if (currentApps.length <= 0) {
      return initializeApp(firebaseClientConfig);
    }

    return currentApps[0] as FirebaseApp;
  };

  const auth = getAuth(app());

  const shouldUseEmulator = () => {
    return Boolean(ENV.APP_ENV === "development" && !auth.emulatorConfig);
  };

  if (shouldUseEmulator()) {
    connectAuthEmulator(
      auth,
      `http://${ENV.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST}`,
      {
        disableWarnings: true,
      }
    );
  }

  return {
    auth,
  };
}
