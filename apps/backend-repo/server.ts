import firebaseInitialize from "./config/firebaseConfig";
import * as functions from "firebase-functions";
import createApp from "./core/app";
import dotenv from "dotenv";

declare module "express-serve-static-core" {
  interface Request {
    credentials: {
      userId: string;
      clientId: string;
    };
  }
}
dotenv.config();

const firebaseInstance = firebaseInitialize();
const app = createApp({ firebaseInstance });

export const apiFunctions = functions.https.onRequest(app);
