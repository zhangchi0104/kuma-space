import { PrismaClient } from '@repo/db';
const prisma = new PrismaClient({
  log: ['query'],
});

export default prisma;
