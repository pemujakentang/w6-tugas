import { PrismaClient } from '@prisma/client';
import { defineEventHandler, getQuery } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { search } = query;

  if (!search) {
    return { error: 'Search term is required.' };
  }

  try {
    const result = await prisma.$queryRawUnsafe(
      `SELECT * FROM GuestbookEntry WHERE comment LIKE '%${search}%'`
    );

    return result;
  } catch (e) {
    console.error('Error executing SQL query:', e);
    return { error: 'Error executing SQL query' };
  }
});

