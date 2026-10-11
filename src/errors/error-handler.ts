
import type { ErrorRequestHandler } from "express";
import { Prisma } from "../../generated/prisma/client.js";
import { AppError } from "./app-error.js";

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req,
  res,
  _next,
) => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
    return;
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError
  ) {
    if (error.code === "P2002") {
      res.status(409).json({
        success: false,
        message: "A record with this unique value already exists",
      });
      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Record not found",
      });
      return;
    }

    if (error.code === "P2003") {
      res.status(409).json({
        success: false,
        message: "The operation conflicts with related records",
      });
      return;
    }
  }

  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
