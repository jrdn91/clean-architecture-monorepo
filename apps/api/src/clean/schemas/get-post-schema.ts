import type { DefaultResponse, Post } from "@repo/models";
import type { Request } from "express";
import { z } from "zod";

export const getPostSchema = {
  params: z.object({
    id: z.string(),
  }),
};

type GetPostRequestParams = z.input<typeof getPostSchema.params>;

export type GetPostRequest = Request<GetPostRequestParams, never, never, never>;

export type GetPostResponse = DefaultResponse<Post>;
