import { NextFunction, Request, Response } from "express";
import AuthMiddleware from "./middleware/authMiddleware";

export type BaseUseCasePayload = {
  credentials: {
    userId: string;
    clientId: string;
  };
};

type CustomRequest = Request & {
  credentials: BaseUseCasePayload["credentials"];
};

export type HTTPControllerProps = {
  request: CustomRequest;
  response: Response;
  next: NextFunction;
};

export type RoutesProps<T> = {
  controller: T;
  middleware: {
    auth: AuthMiddleware["execute"];
  };
};
