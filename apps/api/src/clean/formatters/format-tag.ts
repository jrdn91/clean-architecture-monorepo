import type { PostWithAuthorAndTags } from "../selectors/post-with-author-and-tags";

export function formatTag({ name }: PostWithAuthorAndTags["Tags"][number]) {
  return name;
}
