import fs from "fs";
import path from "path";

export const deleteFile = async (pathToFile) => {
  try {
    const sourceFile = path.resolve(pathToFile);
    fs.promises.unlink(sourceFile);
    console.log(`File deleted successfully: ${sourceFile}`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
};
