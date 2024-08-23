import { log } from "@repo/logger";
import { createServer } from "./server";
import { prisma } from "./prisma";

const port = process.env.PORT || 5001;
const server = createServer(prisma);

server.listen(port, () => {
  log(`api running on ${port}`);
});
