
import { z } from "zod";

export const createProfileSchema = z
  .object({
    bio: z.string().trim().min(1).max(1000),
    userId: z.number().int().positive(),
  })
  .strict();

export const updateProfileSchema = z
  .object({
    bio: z.string().trim().min(1).max(1000),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided",
  );

export type CreateProfileInput =
  z.infer<typeof createProfileSchema>;

export type UpdateProfileInput =
  z.infer<typeof updateProfileSchema>;
