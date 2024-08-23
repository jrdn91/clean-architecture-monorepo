import type { Prisma } from "@prisma/client";

export default function createAuthApis(prisma: Prisma) {
  return {
    permissions: {
      has: ({ permission }: { permission: string }) => {},
    },
  };
}
