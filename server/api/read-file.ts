import { promises as fs } from "fs";
import {
  defineEventHandler,
  getQuery,
  sendStream,
  setResponseHeader,
} from "h3";
import path from "path";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { filename } = query;

  if (!filename) {
    return { error: "Filename is required." };
  }

  try {
    const safeFilename = String(filename).replace(/[^a-zA-Z0-9._-]/g, "");
    const allowedFiles = ["guide.pdf"];

    if (!allowedFiles.includes(safeFilename)) {
      throw new Error("Unauthorized file access");
    }

    const baseDir = path.resolve("./uploads");
    const filePath = path.join(baseDir, safeFilename);

    const fileStats = await fs.stat(filePath);
    if (!fileStats.isFile()) {
      throw new Error("File not found or not accessible");
    }

    const fileStream = await fs.open(filePath, "r");
    setResponseHeader(
      event,
      "Content-Disposition",
      `attachment; filename="${safeFilename}"`
    );

    return sendStream(event, fileStream.createReadStream());
  } catch (error) {
    console.error("Error reading file:", error);
    return { error: "Unable to read the specified file." };
  }
});
