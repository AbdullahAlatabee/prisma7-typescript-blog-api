
import type { RequestHandler } from "express";
import { AppError } from "../../errors/app-error.js";
import { parseId } from "../../utils/parse-id.js";
import { postsService } from "./posts.service.js";
import {
  listPostsQuerySchema,
} from "./posts.validator.js";
import type {
  CreatePostInput,
  UpdatePostInput,
} from "./posts.validator.js";

export const getPosts: RequestHandler = async (req, res) => {
  const result = listPostsQuerySchema.safeParse(req.query);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => {
        const field = issue.path.join(".");
        return field ? `${field}: ${issue.message}` : issue.message;
      })
      .join("; ");

    throw new AppError(400, message);
  }

  const resultData = await postsService.findAll(result.data);

  res.status(200).json({
    success: true,
    ...resultData,
  });
};

export const getPostById: RequestHandler = async (req, res) => {
  const id = parseId(req.params.id, "Post ID");
  const post = await postsService.findById(id);

  res.status(200).json({
    success: true,
    data: post,
  });
};

export const createPost: RequestHandler = async (req, res) => {
  const data = req.body as CreatePostInput;
  const post = await postsService.create(data);

  res.status(201).json({
    success: true,
    data: post,
  });
};

export const updatePost: RequestHandler = async (req, res) => {
  const id = parseId(req.params.id, "Post ID");
  const data = req.body as UpdatePostInput;
  const post = await postsService.update(id, data);

  res.status(200).json({
    success: true,
    data: post,
  });
};

export const deletePost: RequestHandler = async (req, res) => {
  const id = parseId(req.params.id, "Post ID");
  await postsService.delete(id);

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
};
