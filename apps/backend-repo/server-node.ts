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

const startServer = async () => {
  const firebaseInstance = firebaseInitialize();
  const app = createApp({ firebaseInstance });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
});
