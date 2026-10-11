
import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/app-error.js";
import type {
  CreateProfileInput,
  UpdateProfileInput,
} from "./profiles.validator.js";

const profileInclude = {
  user: {
    select: {
      id: true,
      email: true,
      name: true,
    },
  },
} as const;

export const profilesService = {
  create(data: CreateProfileInput) {
    const { userId, bio } = data;

    return prisma.profile.create({
      data: {
        bio,
        user: {
          connect: { id: userId },
        },
      },
      include: profileInclude,
    });
  },

  async findByUserId(userId: number) {
    const profile = await prisma.profile.findUnique({
      where: { userId },
      include: profileInclude,
    });

    if (!profile) {
      throw new AppError(404, "Profile not found");
    }

    return profile;
  },

  async update(
    id: number,
    data: UpdateProfileInput,
  ) {
    const existing = await prisma.profile.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError(404, "Profile not found");
    }

    return prisma.profile.update({
      where: { id },
      data,
      include: profileInclude,
    });
  },

  async delete(id: number) {
    const existing = await prisma.profile.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError(404, "Profile not found");
    }

    return prisma.profile.delete({
      where: { id },
    });
  },
};

