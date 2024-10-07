
import { promises as fs } from 'fs';
import { defineEventHandler, getQuery, sendStream } from 'h3';
import path from 'path';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { filename } = query;

  if (!filename) {
    return { error: 'Filename is required.' };
  }

  try {
    const safeFilename = String(filename);

    const baseDir = path.resolve('./uploads');
    const filePath = path.join(baseDir, safeFilename);

    const fileStream = await fs.open(filePath, 'r');

    setResponseHeader(event, 'Content-Disposition', `attachment; filename="${path.basename(filePath)}"`)
      
    return sendStream(event, fileStream.createReadStream());
  } catch (error) {
    console.error('Error reading file:', error);
    return { error: 'Unable to read the specified file.' };
  }
});

