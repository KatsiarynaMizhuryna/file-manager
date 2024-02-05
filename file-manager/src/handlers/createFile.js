import { cwd } from "process";
import path from "path";
import fs from "fs";

export const createFile = (fileName) => {
  const filePath = path.join(cwd(), fileName);
  const writeStream = fs.createWriteStream(filePath);

  writeStream.on("finish", () => {
    console.log(`Empty file created successfully: ${filePath}`);
  });

  writeStream.on("error", (err) => {
    console.error(`Error creating file: ${err.message}`);
  });

  writeStream.end();
};
