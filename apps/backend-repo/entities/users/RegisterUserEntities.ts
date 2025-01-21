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
        P.not({
          name: P.string.minLength(3),
          email: P.string.minLength(10),
          password: P.string.minLength(8),
        }),
        () => {
          throw new InvariantError("Invalid request payload");
        }
      )
      .otherwise(() => payload);
  }
}
