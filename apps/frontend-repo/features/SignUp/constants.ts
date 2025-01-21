import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(10),
  password: z.string().min(8),
  confirm_password: z.string().min(8),
});
