import { RegisterUserPayload } from "@repo/shared/src/types/userType.js";
import UsersRepository from "../../repository/usersRepository";
import RegisterUserEntities from "../../entities/users/RegisterUserEntities";
import { BaseUseCasePayload } from "../../types";

type RegisterUserUseCaseProps = {
  usersRepository: UsersRepository;
};

export type RegisterUserUseCasePayload = {
  payload: RegisterUserPayload;
} & BaseUseCasePayload;

export default class RegisterUserUseCase {
  public _usersRepository: RegisterUserUseCaseProps["usersRepository"];

  constructor({ usersRepository }: RegisterUserUseCaseProps) {
    this._usersRepository = usersRepository;
  }

  async execute({ payload }: RegisterUserUseCasePayload) {
    const { payload: validPayload } = new RegisterUserEntities(payload);

    const userData = await this._usersRepository.addUser(validPayload);

    return userData;
  }
}
