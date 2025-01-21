import { z } from "zod";
import { signInFormSchema } from "./constants";

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
