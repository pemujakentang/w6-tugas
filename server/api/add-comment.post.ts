import { PrismaClient } from '@prisma/client';
import { defineEventHandler, readBody } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, email, comment } = body;

  if (!name || !email || !comment) {
    return { error: 'All fields are required.' };
  }

  const newEntry = await prisma.guestbookEntry.create({
    data: {
      name,
      email,
      comment,
    },
  });

  return newEntry;
});
