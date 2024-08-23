import type { Response } from "express";
import type {
  DeletePostRequest,
  DeletePostResponse,
} from "../schemas/delete-post-schema";
import { prisma } from "../../prisma";

export default async function deletePostHandler(
  req: DeletePostRequest,
  res: Response<DeletePostResponse>
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
  await prisma.post.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json();
}
