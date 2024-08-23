import type { PostWithAuthorAndTags } from "../selectors/post-with-author-and-tags";

export function formatAuthor(author: PostWithAuthorAndTags["Author"]) {
  return {
    id: author.userId,
    firstName: author.User.firstName,
    lastName: author.User.lastName,
    email: author.User.email,
    createdAt: author.User.createdAt,
    updatedAt: author.User.updatedAt,
    bio: author.bio,
  };
}
