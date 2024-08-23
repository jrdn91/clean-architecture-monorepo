import type { DefaultResponse, Post } from "@repo/models";
import type { Request } from "express";
import { z } from "zod";

export const deletePostSchema = {
  params: z.object({
    id: z.string(),
  }),
};

type DeletePostRequestParams = z.input<typeof deletePostSchema.params>;

export type DeletePostRequest = Request<
  DeletePostRequestParams,
  never,
  never,
  never
>;

export type DeletePostResponse = DefaultResponse<undefined>;
