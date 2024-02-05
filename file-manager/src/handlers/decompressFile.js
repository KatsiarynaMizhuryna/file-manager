import fs from "fs";
import zlib from "zlib";
import path from "path";

export const decompress = (inputFile, outputFile) => {
  const inputFilePath = path.resolve(inputFile);
  const outputFilePath = path.resolve(outputFile);
  const inputStream = fs.createReadStream(inputFilePath);
  const outputStream = fs.createWriteStream(outputFilePath);
  const brotliStream = zlib.createBrotliDecompress();

  inputStream.pipe(brotliStream).pipe(outputStream);

  outputStream.on("finish", () => {
    console.log(`File decompressed successfully: ${outputFilePath}`);
  });

  outputStream.on("error", (err) => {
    console.error(`Error writing decompressed file: ${err.message}`);
  });
};
