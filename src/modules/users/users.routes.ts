
import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./users.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import {
  createUserSchema,
  updateUserSchema,
} from "./users.validator.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);

router.post(
  "/",
  validateBody(createUserSchema),
  createUser,
);

router.patch(
  "/:id",
  validateBody(updateUserSchema),
  updateUser,
);

router.delete("/:id", deleteUser);

export default router;

