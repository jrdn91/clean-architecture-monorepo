import type { Response } from "express";
import type {
  GetPostRequest,
  GetPostResponse,
} from "../schemas/get-post-schema";
import { prisma } from "../../prisma";

export default async function getPostHandler(
  req: GetPostRequest,
  res: Response<GetPostResponse>
) {
  const dbPost = await prisma.post.findFirst({
    include: {
      Author: {
        include: {
          User: true,
        },
      },
      Tags: true,
    },
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!dbPost) {
    return res.status(404).json({
      errorMessage: "Post not found",
    });
  }
  const { Author, Tags, ...post } = dbPost;
  return res.json({
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
