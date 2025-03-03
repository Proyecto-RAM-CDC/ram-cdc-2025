declare namespace NodeJS {
    interface Global {
      __db?: PrismaClient;
    }
  }
