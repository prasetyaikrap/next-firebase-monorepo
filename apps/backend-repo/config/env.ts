export const ENV = {
  APP_ENV: process.env.APP_ENV ?? "development",
  APP_HOST: process.env.APP_HOST ?? "http://localhost:3001",
  APP_DOMAIN: process.env.APP_DOMAIN ?? "localhost:3001",
  FIREBASE_SERVICE_ACCOUNT: process.env.FIREBASE_SERVICE_ACCOUNT ?? "{}",
  CLIENT_ID: process.env.CLIENT_ID ?? "PRASETYA-EBUDDY",
};
