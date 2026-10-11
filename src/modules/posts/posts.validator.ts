
import { z } from "zod";

export const createPostSchema = z
    .object({
        title: z.string().trim().min(3).max(200),
        authorId: z.number().int().positive(),
        published: z.boolean().optional(),
    })
    .strict();

export const updatePostSchema = z
    .object({
        title: z.string().trim().min(3).max(200).optional(),
        published: z.boolean().optional(),
    })
    .strict()
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field must be provided",
    );

export const listPostsQuerySchema = z
    .object({
        page: z.coerce.number().int().min(1).default(1),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        published: z.enum(["true", "false"]).optional(),
        search: z.string().trim().max(200).optional(),
        authorId: z.coerce.number().int().positive().optional(),
    })
    .strict();

export type CreatePostInput =
    z.infer<typeof createPostSchema>;

export type UpdatePostInput =
    z.infer<typeof updatePostSchema>;

export type ListPostsQuery =
    z.infer<typeof listPostsQuerySchema>;

