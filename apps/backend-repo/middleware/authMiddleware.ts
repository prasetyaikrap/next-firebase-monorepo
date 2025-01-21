import { NextFunction, Request, Response } from "express";
import AuthenticationsRepository from "../repository/authenticationsRepository";
import { CustomRequest } from "types";
import autoBind from "auto-bind";

type AuthMiddlewareProps = {
  authenticationsRepository: AuthenticationsRepository;
};

export default class AuthMiddleware {
  public _authenticationsRepository: AuthMiddlewareProps["authenticationsRepository"];

  constructor({ authenticationsRepository }: AuthMiddlewareProps) {
    this._authenticationsRepository = authenticationsRepository;
    autoBind(this);
  }

  async execute(req: CustomRequest, _res: Response, next: NextFunction) {
    const authHeader = req.headers["authorization"] || "";
    const idToken = authHeader.split(" ")[1] || "";
    const clientIdHeader = (req.headers["x-client-id"] as string) || "";

    const { clientId } = await this._authenticationsRepository.verifyClientId({
      clientId: clientIdHeader,
    });
    const { userId } = await this._authenticationsRepository.verifyIdToken({
      idToken,
    });

    req.credentials = {
      clientId,
      userId,
    };

    next();
  }
}
