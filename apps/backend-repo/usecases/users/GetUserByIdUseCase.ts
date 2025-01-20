import { UserData } from "@repo/shared/src/types/userType.js";
import UsersRepository from "../../repository/usersRepository";
import { BaseUseCasePayload } from "../../types";

type GetUserByIdUseCaseProps = {
  usersRepository: UsersRepository;
};

export type GetUserByIdUseCasePayload = {
  userId: string;
} & BaseUseCasePayload;

export default class GetUserByIdUseCase {
  public _usersRepository: GetUserByIdUseCaseProps["usersRepository"];

  constructor({ usersRepository }: GetUserByIdUseCaseProps) {
    this._usersRepository = usersRepository;
  }

  async execute({ userId }: GetUserByIdUseCasePayload): Promise<UserData> {
    const userData = await this._usersRepository.getUserById({ userId });

    return userData;
  }
}
