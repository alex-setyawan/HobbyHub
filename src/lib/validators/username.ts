import { z } from "zod";

export const UsernameValidator = z.object({
  name: z
        .string()
        .min(3)
        .max(32)
        .regex(/^[a-zA-Z0-9_]+$/),
  teleHandle: z.string(),
  email: z.string(),
  bio: z.string(),
});

export type UsernameRequest = z.infer<typeof UsernameValidator>;
