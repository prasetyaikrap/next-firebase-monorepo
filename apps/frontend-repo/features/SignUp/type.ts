import { z } from "zod";
import { signUpFormSchema } from "./constants";

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
