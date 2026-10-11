
import { Router } from "express";
import {
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "./posts.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import {
  createPostSchema,
  updatePostSchema,
} from "./posts.validator.js";

const router = Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

router.post(
  "/",
  validateBody(createPostSchema),
  createPost,
);

router.patch(
  "/:id",
  validateBody(updatePostSchema),
  updatePost,
);

router.delete("/:id", deletePost);

export default router;
