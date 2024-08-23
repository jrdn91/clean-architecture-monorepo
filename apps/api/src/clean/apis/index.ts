import type { PrismaClient } from "@prisma/client";
import createPostsApis from "./posts";

export const createApis = (prisma: PrismaClient) => {
  return {
    posts: createPostsApis(prisma),
  };
};

export type Apis = ReturnType<typeof createApis>;
