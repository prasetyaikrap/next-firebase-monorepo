import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().min(10),
  password: z.string().min(8),
  is_remember_me: z.boolean(),
});
