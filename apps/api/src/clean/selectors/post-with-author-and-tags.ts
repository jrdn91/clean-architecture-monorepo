import { Prisma } from "@prisma/client";

export const PostSelector = {
  include: {
    Author: {
      include: {
        User: true,
      },
    },
    Tags: true,
  },
} satisfies Prisma.PostFindFirstArgs;

const postWithAuthorAndTags =
  Prisma.validator<Prisma.PostFindFirstArgs>()(PostSelector);

export type PostWithAuthorAndTags = Prisma.PostGetPayload<
  typeof postWithAuthorAndTags
>;
