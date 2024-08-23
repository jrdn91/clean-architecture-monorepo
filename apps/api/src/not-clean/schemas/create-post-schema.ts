import type { DefaultResponse, Post } from "@repo/models";
import type { Request } from "express";
import { z } from "zod";

export const createPostSchema = {
  body: z.object({
    title: z.string(),
    content: z.string().max(1000),
    tags: z
      .array(
        z.object({
          name: z.string(),
          id: z.number().optional(),
        })
      )
      .optional(),
  }),
};

type CreatePostRequestBody = z.input<typeof createPostSchema.body>;

export type CreatePostRequest = Request<
  never,
  never,
  CreatePostRequestBody,
  never
>;

export type CreatePostResponse = DefaultResponse<Post>;
