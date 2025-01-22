import "express-async-errors";

import express from "express";
import cors from "cors";
import firebaseInitialize from "../config/firebaseConfig";
import UsersRepository from "../repository/usersRepository";
import RegisterUserUseCase from "../usecases/users/RegisterUserUseCase";
import GetUserByIdUseCase from "../usecases/users/GetUserByIdUseCase";
import UpdateUserByIdUseCase from "../usecases/users/UpdateUserByIdUseCase";
import AuthenticationsRepository from "../repository/authenticationsRepository";
import userRoutes from "../routes/usersRoute";
import UsersController from "../controller/usersController";
import AuthMiddleware from "../middleware/authMiddleware";
import errorHandlerMiddleware from "../middleware/errorHandlerMiddleware";

export default async function createApp() {
  const { firestoreDB, firebaseAuth } = await firebaseInitialize();

  // Repositories
  const authenticationsRepository = new AuthenticationsRepository({
    firebaseAuth,
  });
  const usersRepository = new UsersRepository({
    firebaseAuth,
    firestore: firestoreDB,
  });

  // Usecases
  const userUseCases = {
    registerUserUseCase: new RegisterUserUseCase({ usersRepository }),
    getUserByIdUseCase: new GetUserByIdUseCase({ usersRepository }),
    updateUserByIdUseCase: new UpdateUserByIdUseCase({
      usersRepository,
      authenticationsRepository,
    }),
  };

  // Middleware
  const authMiddleware = new AuthMiddleware({ authenticationsRepository });

  // Router Handler
  const userRouter = userRoutes({
    controller: new UsersController(userUseCases),
    middleware: { auth: authMiddleware.execute },
  });

  // Initialize App
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.get("/", (_req, res) => {
    res.json({ message: "Express Firebase Service - Prasetya EBuddy" });
  });
  app.use("/v1/users", userRouter);

  // Error Handling
  app.use(errorHandlerMiddleware);

  return app;
}
