import { NextFunction, Request, Response } from "express";
import AuthMiddleware from "./middleware/authMiddleware";

export type BaseUseCasePayload = {
  credentials: {
    userId: string;
    clientId: string;
  };
};

export interface CustomRequest extends Request {
  credentials: BaseUseCasePayload["credentials"];
}

export type RoutesProps<T> = {
  controller: T;
  middleware: {
    auth: AuthMiddleware["execute"];
  };
};
