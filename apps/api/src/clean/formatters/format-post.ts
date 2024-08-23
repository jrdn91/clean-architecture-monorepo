import type { Author } from "@repo/models";
import type { PostWithAuthorAndTags } from "../selectors/post-with-author-and-tags";

export function formatPostWith({
  authorFormatter,
  tagFormatter,
}: {
  tagFormatter: (tag: PostWithAuthorAndTags["Tags"][number]) => string;
  authorFormatter: (author: PostWithAuthorAndTags["Author"]) => Author;
}) {
  return function formatPost({
    post: { Author, Tags, ...post },
  }: {
    post: PostWithAuthorAndTags;
  }) {
    return {
      ...post,
      Tags: Tags.map(tagFormatter),
      Author: authorFormatter(Author),
    };
  };
}
