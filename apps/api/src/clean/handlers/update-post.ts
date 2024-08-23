import type { Response } from "express";
import type { Apis } from "../apis";
import type {
  UpdatePostRequest,
  UpdatePostResponse,
} from "../schemas/update-post-schema";

export default function updatePostWith(apis: Apis) {
  return async function updatePostHandler(
    req: UpdatePostRequest,
    res: Response<UpdatePostResponse>
  ) {
    const ownsPost = await apis.posts.validators.ownsPost({
      postId: parseInt(req.params.id),
      userId: parseInt(req.headers.authorization as unknown as string),
    });
    if (!ownsPost) {
      return res.status(403).json({
        errorMessage:
          "You are not allowed to update a post you are not the author of",
      });
    }
    const updatedPost = await apis.posts.updatePost({
      postId: parseInt(req.params.id),
      userId: parseInt(req.headers.authorization as unknown as string),
      content: req.body?.content,
      title: req.body?.title,
      tags: req.body?.tags,
    });
    res.json({
      data: updatedPost,
    });
  };
}
