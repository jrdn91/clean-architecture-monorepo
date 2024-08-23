import type { Response } from "express";
import type { Apis } from "../apis";
import type {
  CreatePostRequest,
  CreatePostResponse,
} from "../schemas/create-post-schema";

export default function createPostWith(apis: Apis) {
  return async function createPostHandler(
    req: CreatePostRequest,
    res: Response<CreatePostResponse>
  ) {
    const newPost = await apis.posts.createPost({
      content: req.body.content,
      title: req.body.title,
      tags: req.body.tags,
      userId: parseInt(req.headers.authorization as unknown as string),
    });
    res.json({
      data: newPost,
    });
  };
}
