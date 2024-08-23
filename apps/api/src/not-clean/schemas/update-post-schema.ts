import type { DefaultResponse, Post } from "@repo/models";
import type { Request } from "express";
import { z } from "zod";
import { createPostSchema } from "./create-post-schema";

export const updatePostSchema = {
  params: z.object({
    id: z.string(),
  }),
  body: createPostSchema.body.optional(),
};

type UpdatePostRequestParams = z.input<typeof updatePostSchema.params>;
type UpdatePostRequestBody = z.input<typeof updatePostSchema.body>;

export type UpdatePostRequest = Request<
  UpdatePostRequestParams,
  never,
  UpdatePostRequestBody,
  never
>;

export type UpdatePostResponse = DefaultResponse<Post>;
