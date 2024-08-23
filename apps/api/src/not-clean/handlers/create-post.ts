import type { Response } from "express";
import type {
  CreatePostRequest,
  CreatePostResponse,
} from "../schemas/create-post-schema";
import { prisma } from "../../prisma";

export default async function createPostHandler(
  req: CreatePostRequest,
  res: Response<CreatePostResponse>
) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }
  const newPost = await prisma.post.create({
    include: {
      Author: {
        include: {
          User: true,
        },
      },
      Tags: true,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
      Tags: {
        connectOrCreate: req.body.tags?.map((tag) => ({
          where: { name: tag.name, id: tag.id },
          create: {
            name: tag.name,
            id: 1,
          },
        })),
      },
      Author: {
        connect: {
          userId: parseInt(req.headers.authorization),
        },
      },
    },
  });
  const { Author, Tags, ...post } = newPost;
  res.json({
    data: {
      ...post,
      Tags: Tags.map(({ name }) => name),
      Author: {
        id: Author.userId,
        firstName: Author.User.firstName,
        lastName: Author.User.lastName,
        email: Author.User.email,
        createdAt: Author.User.createdAt,
        updatedAt: Author.User.updatedAt,
        bio: Author.bio,
      },
    },
  });
}
