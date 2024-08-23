import { Router } from "express";
import { processRequest } from "zod-express-middleware";
import { getPostSchema } from "./schemas/get-post-schema";
import { createPostSchema } from "./schemas/create-post-schema";
import { updatePostSchema } from "./schemas/update-post-schema";
import { deletePostSchema } from "./schemas/delete-post-schema";
import type { Apis } from "./apis";
import listPostsWith from "./handlers/list-posts";
import getPostWith from "./handlers/get-post";
import createPostWith from "./handlers/create-post";
import updatePostWith from "./handlers/update-post";
import deletePostWith from "./handlers/delete-post";
import withAuthorized from "./middleware/with-authorized";

const posts = Router();

function createCleanRoutes(router: Router, apis: Apis): void {
  router.use("/clean/users", posts);

  // GET
  posts.get("/", listPostsWith(apis));
  posts.get("/:id", processRequest(getPostSchema), getPostWith(apis));

  // POST
  posts.post(
    "/",
    withAuthorized,
    processRequest(createPostSchema),
    createPostWith(apis)
  );

  // PUT
  posts.put(
    "/:id",
    withAuthorized,
    processRequest(updatePostSchema),
    updatePostWith(apis)
  );

  // DELETE
  posts.delete(
    "/:id",
    withAuthorized,
    processRequest(deletePostSchema),
    deletePostWith(apis)
  );
}

export default createCleanRoutes;
