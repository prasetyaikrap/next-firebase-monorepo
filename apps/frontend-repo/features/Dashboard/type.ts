import { z } from "zod";
import { userProfileFormSchema } from "./constants";

export type UserProfileFormSchema = z.infer<typeof userProfileFormSchema>;
