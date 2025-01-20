import AuthenticationsRepository from "../repository/authenticationsRepository";
import { HTTPControllerProps } from "../types";

type AuthMiddlewareProps = {
  authenticationsRepository: AuthenticationsRepository;
};

export default class AuthMiddleware {
  public _authenticationsRepository: AuthMiddlewareProps["authenticationsRepository"];

  constructor({ authenticationsRepository }: AuthMiddlewareProps) {
    this._authenticationsRepository = authenticationsRepository;
  }

  async execute({ request, next }: HTTPControllerProps) {
    const authHeader = request.headers["authorization"] || "";
    const idToken = authHeader.split(" ")[1] || "";
    const clientIdHeader = (request.headers["x-client-id"] as string) || "";

    const { clientId } = await this._authenticationsRepository.verifyClientId({
      clientId: clientIdHeader,
    });
    const { userId } = await this._authenticationsRepository.verifyIdToken({
      idToken,
    });

    request.credentials = {
      clientId,
      userId,
    };

    next();
  }
}
