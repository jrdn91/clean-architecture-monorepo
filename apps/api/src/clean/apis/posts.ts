import type { Prisma, PrismaClient } from "@prisma/client";
import { formatPostWith } from "../formatters/format-post";
import { PostSelector } from "../selectors/post-with-author-and-tags";
import { formatAuthor } from "../formatters/format-author";
import { formatTag } from "../formatters/format-tag";

export default function createPostsApis(prisma: PrismaClient) {
  const formatPost = formatPostWith({
    authorFormatter: formatAuthor,
    tagFormatter: formatTag,
  });
  return {
    listPosts: async () => {
      const posts = (await prisma.post.findMany(PostSelector)).map((post) =>
        formatPost({
          post,
        })
      );
      return posts;
    },
    getPost: async (whereClause: Prisma.PostFindFirstArgs["where"]) => {
      const post = await prisma.post.findFirst({
        ...PostSelector,
        where: whereClause,
      });
      if (!post) {
        return null;
      }
      return formatPost({
        post,
      });
    },
    createPost: async ({
      title,
      content,
      tags,
      userId,
    }: {
      title: string;
      content: string;
      tags?: {
        name: string;
        id?: number;
      }[];
      userId: number;
    }) => {
      const newPost = await prisma.post.create({
        ...PostSelector,
        data: {
          title,
          content,
          Tags: {
            connectOrCreate: tags?.map((tag) => ({
              where: { name: tag.name, id: tag.id },
              create: {
                name: tag.name,
              },
            })),
          },
          Author: {
            connect: {
              userId,
            },
          },
        },
      });
      return formatPost({
        post: newPost,
      });
    },
    updatePost: async ({
      postId,
      userId,
      content,
      tags,
      title,
    }: {
      postId: number;
      title?: string;
      content?: string;
      tags?: {
        name: string;
        id?: number;
      }[];
      userId: number;
    }) => {
      const updatedPost = await prisma.post.update({
        include: {
          Author: {
            include: {
              User: true,
            },
          },
          Tags: true,
        },
        data: {
          title,
          content,
          Tags: {
            connectOrCreate: tags?.map((tag) => ({
              where: { name: tag.name, id: tag.id },
              create: {
                name: tag.name,
              },
            })),
          },
          Author: {
            connect: {
              userId,
            },
          },
        },
        where: {
          id: postId,
        },
      });
      return formatPost({
        post: updatedPost,
      });
    },
    deletePost: async ({ postId }: { postId: number }) => {
      await prisma.post.delete({
        where: {
          id: postId,
        },
      });
    },
    formatters: {
      formatPost,
      formatAuthor,
      formatTag,
    },
    validators: {
      ownsPost: async ({
        postId,
        userId,
      }: {
        postId: number;
        userId: number;
      }) => {
        return (
          (await prisma.post.count({
            where: {
              id: postId,
              authorId: userId,
            },
          })) > 0
        );
      },
    },
  };
}
