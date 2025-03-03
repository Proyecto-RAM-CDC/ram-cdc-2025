import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  const globalWithPrisma = global as typeof globalThis & { __db?: PrismaClient };
  if (!globalWithPrisma.__db) {
    globalWithPrisma.__db = new PrismaClient();
    globalWithPrisma.__db.$connect();
  }
  prisma = globalWithPrisma.__db;
}

export { prisma };
