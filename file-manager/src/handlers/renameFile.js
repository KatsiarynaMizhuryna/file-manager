import path from "path";
import fs from "fs";

export const rename = async (fileName, newFileName) => {
  try {
    const sourceFilePath = path.join(path.dirname(fileName), fileName);
    const destinationFilePath = path.join(path.dirname(fileName), newFileName);
    await fs.promises.rename(sourceFilePath, destinationFilePath);
    console.log(
      `File renamed successfully: ${sourceFilePath} -> ${destinationFilePath}`
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("FS operation failed: Source file does not exist");
    } else {
      console.error(error.message);
    }
  }
};
