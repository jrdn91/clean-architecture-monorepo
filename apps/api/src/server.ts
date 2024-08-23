import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import type { PrismaClient } from "@prisma/client";
import createCleanRoutes from "./clean/routes";
import createNotCleanRoutes from "./not-clean/routes";
import { createApis } from "./clean/apis";

export const createServer = (prisma: PrismaClient): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  // setup apis
  const apis = createApis(prisma);

  // setup routes
  createCleanRoutes(app);
  createNotCleanRoutes(app);

  return app;
};
