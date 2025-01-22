import { NextFunction, Request, Response } from "express";
import { FirebaseAuthError } from "firebase-admin/auth";
import ClientError from "../utils/exceptions/ClientError";
import { firebaseAuthError } from "@repo/shared/src/utils/firebase.js";

export default function errorHandlerMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof FirebaseAuthError) {
    const { code, message, error } = firebaseAuthError(err);
    return res.status(code).json({ success: false, message, error });
  }

  if (err instanceof ClientError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, error: err });
  }

  return res
    .status(500)
    .json({ success: false, message: err.message, error: err });
}
