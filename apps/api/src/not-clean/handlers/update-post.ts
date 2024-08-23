import type { Response } from "express";
import { prisma } from "../../prisma";
import type {
  UpdatePostRequest,
  UpdatePostResponse,
} from "../schemas/update-post-schema";

export default async function updatePostHandler(
  req: UpdatePostRequest,
  res: Response<UpdatePostResponse>
) {
  if (!req.headers.authorization) {
    return res.status(401).json({
      errorMessage: "Unauthorized",
    });
  }
  const postAuthor = await prisma.post.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    select: {
      authorId: true,
    },
  });
  if (postAuthor?.authorId !== parseInt(req.headers.authorization)) {
    return res.status(403).json({
      errorMessage: "Forbidden",
    });
  }
  const newPost = await prisma.post.update({
    include: {
      Author: {
        include: {
          User: true,
        },
      },
      Tags: true,
    },
    data: {
      title: req.body?.title,
      content: req.body?.content,
      Tags: {
        connectOrCreate: req.body?.tags?.map((tag) => ({
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
    where: {
      id: parseInt(req.params.id),
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
