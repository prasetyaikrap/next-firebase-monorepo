import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().min(10),
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .superRefine((args, ctx) => {
    if (args.password !== args.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        fatal: true,
        message: "Password not match",
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirm_password"],
        fatal: true,
        message: "Password not match",
      });
    }
  });
