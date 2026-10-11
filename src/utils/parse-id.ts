
import { AppError } from "../errors/app-error.js";

export function parseId(value: unknown, label = "ID"): number {
  if (
    typeof value !== "string" ||
    !/^[1-9]\d*$/.test(value)
  ) {
    throw new AppError(
      400,
      `${label} must be a positive integer`,
    );
  }

  const id = Number(value);

  if (!Number.isSafeInteger(id)) {
    throw new AppError(
      400,
      `${label} must be a positive integer`,
    );
  }

  return id;
}
