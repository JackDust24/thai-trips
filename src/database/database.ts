import { PrismaClient } from '@prisma/client';

// Create singleton
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const dbase = globalThis.prisma ?? prismaClientSingleton();

export default dbase;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = dbase;
