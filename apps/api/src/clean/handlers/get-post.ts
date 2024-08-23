import type { Response } from "express";
import type { Apis } from "../apis";
import type {
  GetPostRequest,
  GetPostResponse,
} from "../schemas/get-post-schema";

export default function getPostWith(apis: Apis) {
  return async function getPostHandler(
    req: GetPostRequest,
    res: Response<GetPostResponse>
  ) {
    const foundPost = await apis.posts.getPost({
      id: parseInt(req.params.id),
    });
    if (!foundPost) {
      return res.status(404).json({
        errorMessage: "Post not found",
      });
    }
    return res.json({
      data: foundPost,
    });
  };
}
