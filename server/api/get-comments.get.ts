import { PrismaClient } from '@prisma/client';
import { defineEventHandler } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const comments = await prisma.guestbookEntry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return comments;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return { error: 'Failed to fetch comments' };
  }
});
