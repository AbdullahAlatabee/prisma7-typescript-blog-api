
import { Prisma } from "../../../generated/prisma/client.js";
import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/app-error.js";
import type {
  CreatePostInput,
  ListPostsQuery,
  UpdatePostInput,
} from "./posts.validator.js";

const postInclude = {
  author: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
} as const;

export const postsService = {
  async findAll(query: ListPostsQuery) {
    const { page, limit, published, search, authorId } = query;

    const where: Prisma.PostWhereInput = {
      ...(published !== undefined && {
        published: published === "true",
      }),
      ...(authorId !== undefined && { authorId }),
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    const skip = (page - 1) * limit;

    const [posts, total] = await prisma.$transaction([
      prisma.post.findMany({
        where,
        include: postInclude,
        orderBy: [
          { createdAt: "desc" },
          { id: "desc" },
        ],
        skip,
        take: limit,
      }),
      prisma.post.count({ where }),
    ]);

    return {
      data: posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  },

  async findById(id: number) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: postInclude,
    });

    if (!post) {
      throw new AppError(404, "Post not found");
    }

    return post;
  },

  create(data: CreatePostInput) {
    const { authorId, title, published } = data;

    return prisma.post.create({
      data: {
        title,
        ...(published !== undefined && { published }),
        author: {
          connect: { id: authorId },
        },
      },
      include: postInclude,
    });
  },

  async update(id: number, data: UpdatePostInput) {
    const existing = await prisma.post.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError(404, "Post not found");
    }

    return prisma.post.update({
      where: { id },
      data,
      include: postInclude,
    });
  },

  async delete(id: number) {
    const existing = await prisma.post.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new AppError(404, "Post not found");
    }

    return prisma.post.delete({
      where: { id },
    });
  },
};

