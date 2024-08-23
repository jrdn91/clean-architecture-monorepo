import { Router } from "express";
import { processRequest } from "zod-express-middleware";
import { getPostSchema } from "./schemas/get-post-schema";
import { createPostSchema } from "./schemas/create-post-schema";
import { updatePostSchema } from "./schemas/update-post-schema";
import getPostHandler from "./handlers/get-post";
import createPostHandler from "./handlers/create-post";
import updatePostHandler from "./handlers/update-post";
import { deletePostSchema } from "./schemas/delete-post-schema";
import deletePostHandler from "./handlers/delete-post";
import listPostsHandler from "./handlers/list-posts";

const posts = Router();

function createNotCleanRoutes(router: Router): void {
  router.use("/not-clean/posts", posts);
}

// GET
posts.get("/", listPostsHandler);
posts.get("/:id", processRequest(getPostSchema), getPostHandler);

// POST
posts.post("/", processRequest(createPostSchema), createPostHandler);

// PUT
posts.put("/:id", processRequest(updatePostSchema), updatePostHandler);

// DELETE
posts.delete("/:id", processRequest(deletePostSchema), deletePostHandler);

export default createNotCleanRoutes;
