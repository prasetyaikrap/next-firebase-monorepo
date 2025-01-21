export const ENV = {
  APP_ENV: process.env.APP_ENV ?? "development",
  CLIENT_ID: process.env.CLIENT_ID ?? "PRASETYA-EBUDDY",
  NEXT_PUBLIC_APP_HOST:
    process.env.NEXT_PUBLIC_APP_HOST ?? "http://localhost:3000",
  NEXT_PUBLIC_APP_DOMAIN:
    process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost:3000",
  NEXT_PUBLIC_FIREBASE_CONFIG: process.env.NEXT_PUBLIC_FIREBASE_CONFIG ?? "{}",
  NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST ?? "127.0.0.1:9099",
};
