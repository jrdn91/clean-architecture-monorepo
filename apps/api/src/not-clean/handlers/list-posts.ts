import type { Response } from "express";
import type { GetPostRequest } from "../schemas/get-post-schema";
import type { ListPostsResponse } from "../schemas/list-post-schema";
import { prisma } from "../../prisma";

export default async function listPostsHandler(
  req: GetPostRequest,
  res: Response<ListPostsResponse>
) {
  const posts = (
    await prisma.post.findMany({
      include: {
        Author: {
          include: {
            User: true,
          },
        },
        Tags: true,
      },
    })
  ).map(({ Author, Tags, ...post }) => ({
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
  }));
  return res.json({
    data: posts,
  });
}
