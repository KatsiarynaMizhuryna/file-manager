import fs from "fs";
import path from "path";
import { createHash } from "node:crypto";

export const calculateHash = async (filePath) => {
  const sourceFile = path.resolve(filePath);
  const hash = createHash("sha256");
  const readableStream = fs.createReadStream(sourceFile);

  return new Promise((resolve, reject) => {
    readableStream.on("data", (chunk) => {
      hash.update(chunk);
    });
    readableStream.on("error", (error) => {
      reject(error);
    });
    readableStream.on("end", () => {
      const hashResult = hash.digest("hex");
      console.log(`HASHRESULT: ${hashResult}`);
      resolve(hashResult);
    });
  });
};
