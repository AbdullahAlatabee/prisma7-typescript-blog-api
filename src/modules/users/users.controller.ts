
import type { RequestHandler } from "express";
// import { AppError } from "../../errors/app-error.js";
import { usersService } from "./users.service.js";
import { parseId } from "../../utils/parse-id.js";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "./users.validator.js";


// function parseUserId(value: unknown): number {
//   if (typeof value !== "string" || !/^[1-9]\d*$/.test(value)) {
//     throw new AppError(400, "User ID must be a positive integer");
//   }

//   const id = Number(value);

//   if (!Number.isSafeInteger(id)) {
//     throw new AppError(400, "User ID must be a positive integer");
//   }

//   return id;
// }


export const getUsers: RequestHandler = async (_req, res) => {
  const users = await usersService.findAll();

  res.status(200).json({
    success: true,
    data: users,
  });
};

export const getUserById: RequestHandler = async (req, res) => {
  // const id = parseUserId(req.params.id!);
  const id = parseId(req.params.id, "User ID");
  const user = await usersService.findById(id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const createUser: RequestHandler = async (req, res) => {
  const data = req.body as CreateUserInput;
  const user = await usersService.create(data);

  res.status(201).json({
    success: true,
    data: user,
  });
};

export const updateUser: RequestHandler = async (req, res) => {
  // const id = parseUserId(req.params.id!);
  const id = parseId(req.params.id, "User ID");
  const data = req.body as UpdateUserInput;
  const user = await usersService.update(id, data);

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const deleteUser: RequestHandler = async (req, res) => {
  // const id = parseUserId(req.params.id!);
  const id = parseId(req.params.id, "User ID");
  await usersService.delete(id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
