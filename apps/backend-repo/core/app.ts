import express, { Response } from "express";
import firebaseInitialize from "../config/firebaseConfig";
import UsersRepository from "../repository/usersRepository";
import RegisterUserUseCase from "../usecases/users/RegisterUserUseCase";
import GetUserByIdUseCase from "../usecases/users/GetUserByIdUseCase";
import UpdateUserByIdUseCase from "../usecases/users/UpdateUserByIdUseCase";
import AuthenticationsRepository from "../repository/authenticationsRepository";
import userRoutes from "../routes/usersRoute";
import UsersController from "../controller/usersController";
import AuthMiddleware from "../middleware/authMiddleware";

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
  app.get("/", (res: Response) => {
    res.json({ message: "Express Firebase Service - Prasetya EBuddy" });
  });
  app.use("/api/users", userRouter);

  return app;
}
