export const ENV = {
  APP_HOST: process.env.NEXT_PUBLIC_APP_HOST ?? "http://localhost:3001",
  APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost:3001",
  FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ?? "",
  FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL ?? "",
  CLIENT_ID: process.env.CLIENT_ID ?? "PRASETYA-EBUDDY",
};
