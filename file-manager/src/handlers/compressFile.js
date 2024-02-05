import fs from "fs";
import zlib from "zlib";
import path from "path";

export const compress = (inputFile, outputFile) => {
  const inputFilePath = path.resolve(inputFile);
  const outputFilePath = path.resolve(outputFile);
  const inputStream = fs.createReadStream(inputFilePath);
  const outputStream = fs.createWriteStream(outputFilePath);
  const brotliStream = zlib.createBrotliCompress();

  inputStream.pipe(brotliStream).pipe(outputStream);

  outputStream.on("finish", () => {
    console.log(`File compressed successfully: ${outputFilePath}`);
  });

  outputStream.on("error", (err) => {
    console.error(`Error writing compressed file: ${err.message}`);
  });
};
