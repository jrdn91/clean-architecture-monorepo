import type { Response } from "express";
import type { Apis } from "../apis";
import type { GetPostRequest } from "../schemas/get-post-schema";
import type { ListPostsResponse } from "../schemas/list-post-schema";

export default function listPostsWith(apis: Apis) {
  return async function listPostsHandler(
    req: GetPostRequest,
    res: Response<ListPostsResponse>
  ) {
    const posts = await apis.posts.listPosts();
    return res.json({
      data: posts,
    });
  };
}
