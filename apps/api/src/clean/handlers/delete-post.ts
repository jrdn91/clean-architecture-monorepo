import type { Response } from "express";
import type { Apis } from "../apis";
import type {
  DeletePostRequest,
  DeletePostResponse,
} from "../schemas/delete-post-schema";

export default function deletePostWith(apis: Apis) {
  return async function deletePostHandler(
    req: DeletePostRequest,
    res: Response<DeletePostResponse>
  ) {
    const ownsPost = await apis.posts.validators.ownsPost({
      postId: parseInt(req.params.id),
      userId: parseInt(req.headers.authorization as unknown as string),
    });
    if (!ownsPost) {
      return res.status(403).json({
        errorMessage:
          "You are not allows to delete a post you are not the author of",
      });
    }
    await apis.posts.deletePost({
      postId: parseInt(req.params.id),
    });
    res.json();
  };
}
