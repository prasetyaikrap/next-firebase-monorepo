import { RegisterUserPayload } from "@repo/shared/src/types/userType.js";
import InvariantError from "../../utils/exceptions/InvariantError";
import { match, P } from "ts-pattern";

export default class RegisterUserEntities {
  public payload: RegisterUserPayload;

  constructor(payload: RegisterUserPayload) {
    const validPayload = this._verifyPayload(payload);
    this.payload = validPayload;
  }

  _verifyPayload(payload: RegisterUserPayload) {
    return match(payload)
      .with(
        {
          username: P.not(P.string.minLength(1)),
          password: P.not(P.string.minLength(1)),
          name: P.not(P.string.minLength(1)),
          email: P.not(P.string.minLength(1)),
        },
        () => {
          throw new InvariantError("Invalid request payload");
        }
      )
      .otherwise(() => payload);
  }
}
