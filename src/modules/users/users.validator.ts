
import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z.email(),
    name: z.string().trim().min(1).max(100).nullable().optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  })
  .strict();

export const updateUserSchema = z
  .object({
    email: z.email().optional(),
    name: z.string().trim().min(1).max(100).nullable().optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided",
  );

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

  