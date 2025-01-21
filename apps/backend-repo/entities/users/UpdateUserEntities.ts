import { UpdateUserPayload } from "@repo/shared/src/types/userType.js";
import InvariantError from "../../utils/exceptions/InvariantError";
import { match, P } from "ts-pattern";

export default class UpdateUserEntities {
  public payload: UpdateUserPayload;

  constructor(payload: UpdateUserPayload) {
    const validPayload = this._verifyPayload(payload);
    this.payload = validPayload;
  }

  _verifyPayload(payload: UpdateUserPayload) {
    return match(payload)
      .with(
        P.not({
          name: P.string.minLength(3),
          email: P.string.minLength(10),
          avatar: P.string,
        }),
        () => {
          throw new InvariantError("Invalid request payload");
        }
      )
      .otherwise(() => payload);
  }
}
