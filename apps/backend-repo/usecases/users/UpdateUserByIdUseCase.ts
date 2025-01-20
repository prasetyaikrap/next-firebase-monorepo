import { UpdateUserPayload } from "@repo/shared/src/types/userType.js";
import UsersRepository from "../../repository/usersRepository";
import AuthenticationsRepository from "../../repository/authenticationsRepository";
import UpdateUserEntities from "../../entities/users/UpdateUserEntities";
import { BaseUseCasePayload } from "../../types";

type UpdateUserByIdUseCaseProps = {
  usersRepository: UsersRepository;
  authenticationsRepository: AuthenticationsRepository;
};

export type UpdateUserByIdUseCasePayload = {
  userId: string;
  payload: UpdateUserPayload;
} & BaseUseCasePayload;

export default class UpdateUserByIdUseCase {
  public _usersRepository: UpdateUserByIdUseCaseProps["usersRepository"];
  public _authenticationsRepository: UpdateUserByIdUseCaseProps["authenticationsRepository"];

  constructor({
    usersRepository,
    authenticationsRepository,
  }: UpdateUserByIdUseCaseProps) {
    this._usersRepository = usersRepository;
    this._authenticationsRepository = authenticationsRepository;
  }

  async execute({
    userId,
    payload,
    credentials: { userId: credentialUserId },
  }: UpdateUserByIdUseCasePayload) {
    const { payload: validPayload } = new UpdateUserEntities(payload);

    await this._authenticationsRepository.verifyUserOwner({
      userId,
      credentialUserId,
    });

    const userData = await this._usersRepository.updateUserById({
      userId,
      payload: validPayload,
    });

    return userData;
  }
}
