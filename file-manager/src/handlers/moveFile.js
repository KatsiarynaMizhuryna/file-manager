import fs from "fs";
import path from "path";

export const move = async (pathToFile, pathToDirectory) => {
  try {
    const sourceFile = path.resolve(pathToFile);
    const destinationFolder = path.resolve(pathToDirectory);
    const fileName = path.basename(sourceFile);
    const destinationFile = path.join(destinationFolder, fileName);

    const readableStream = fs.createReadStream(sourceFile);
    const writableStream = fs.createWriteStream(destinationFile);

    writableStream.on("error", (err) => {
      console.error(`Error writing file ${destinationFile}: ${err.message}`);
    });

    await new Promise((resolve, reject) => {
      readableStream.pipe(writableStream);
      readableStream.on("end", () => {
        fs.promises.unlink(sourceFile);
        resolve();
      });
      readableStream.on("error", (err) => {
        console.error(`Error reading file ${sourceFile}: ${err.message}`);
        reject(err);
      });
    });
    console.log(`File moved successfully: ${destinationFile}`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
};
