import { NextFunction, Response } from "express";
import RegisterUserEntities from "../entities/users/RegisterUserEntities";
import UpdateUserEntities from "../entities/users/UpdateUserEntities";
import { CustomRequest } from "../types";
import GetUserByIdUseCase, {
  GetUserByIdUseCasePayload,
} from "../usecases/users/GetUserByIdUseCase";
import RegisterUserUseCase, {
  RegisterUserUseCasePayload,
} from "../usecases/users/RegisterUserUseCase";
import UpdateUserByIdUseCase, {
  UpdateUserByIdUseCasePayload,
} from "../usecases/users/UpdateUserByIdUseCase";
import autoBind from "auto-bind";

export type UsersControllerProps = {
  registerUserUseCase: RegisterUserUseCase;
  getUserByIdUseCase: GetUserByIdUseCase;
  updateUserByIdUseCase: UpdateUserByIdUseCase;
};

export default class UsersController {
  public _registerUserUseCase: UsersControllerProps["registerUserUseCase"];
  public _getUserByIdUseCase: UsersControllerProps["getUserByIdUseCase"];
  public _updateUserByIdUseCase: UsersControllerProps["updateUserByIdUseCase"];

  constructor({
    registerUserUseCase,
    getUserByIdUseCase,
    updateUserByIdUseCase,
  }: UsersControllerProps) {
    this._registerUserUseCase = registerUserUseCase;
    this._getUserByIdUseCase = getUserByIdUseCase;
    this._updateUserByIdUseCase = updateUserByIdUseCase;
    autoBind(this);
  }

  async postRegisterUser(
    request: CustomRequest,
    response: Response,
    _next: NextFunction
  ) {
    const payload: RegisterUserEntities["payload"] = await request.body;

    const useCasePayload: RegisterUserUseCasePayload = {
      credentials: request.credentials,
      payload,
    };

    const { id } = await this._registerUserUseCase.execute(useCasePayload);

    return response.json({
      code: 201,
      data: {
        id,
      },
      message: "User created successfully",
    });
  }

  async getUserById(
    request: CustomRequest,
    response: Response,
    _next: NextFunction
  ) {
    const useCasePayload: GetUserByIdUseCasePayload = {
      credentials: request.credentials,
      userId: request.params.id || "",
    };

    const userData = await this._getUserByIdUseCase.execute(useCasePayload);

    return response.json({
      code: 200,
      data: userData,
      message: "User collected successfully",
    });
  }

  async putUpdateUserById(
    request: CustomRequest,
    response: Response,
    _next: NextFunction
  ) {
    const payload: UpdateUserEntities["payload"] = await request.body;
    const useCasePayload: UpdateUserByIdUseCasePayload = {
      credentials: request.credentials,
      userId: request.params.id || "",
      payload,
    };

    const { id } = await this._updateUserByIdUseCase.execute(useCasePayload);

    return response.json({
      code: 200,
      data: { id },
      message: "User updated successfully",
    });
  }
}
