
import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/app-error.js";
import type {
  CreateUserInput,
  UpdateUserInput,
} from "./users.validator.js";

export const usersService = {
  findAll() {
    return prisma.user.findMany({
      orderBy: { id: "asc" },
    });
  },

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  },

  create(data: CreateUserInput) {
    return prisma.user.create({
      data,
    });
  },

  async update(id: number, data: UpdateUserInput) {
    await this.findById(id);

    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    await this.findById(id);

    return prisma.user.delete({
      where: { id },
    });
  },
};

