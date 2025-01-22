import { z } from "zod";

export const userProfileFormSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  email: z.string().min(10),
  avatar: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  _avatar_render: z.string(),
  _avatar_current: z.string(),
});
