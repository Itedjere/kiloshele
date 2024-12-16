import { access, constants, unlink } from "node:fs/promises";
import path from "node:path";
import { __dirname } from "../serverPath.js";

export const fileDeletion = async (fileUrl) => {
  try {
    // Construct the file path
    const filePath = path.join(__dirname, fileUrl);
    await access(filePath, constants.F_OK);
    await unlink(filePath);
    console.log("successfully deleted", filePath);
  } catch (error) {
    console.error("Error deleting file", error);
    throw error;
  }
};
