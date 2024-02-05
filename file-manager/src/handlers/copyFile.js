import { createReadStream, createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const copyFile = async (pathToFile, pathToDirectory) => {
  console.log("HELLO");
  const sourceFile = path.basename(pathToFile);
  const destinationFolder = pathToDirectory;

  try {
    // Construct the full paths using __dirname
    const sourcePath = path.join(__dirname, pathToFile); // Go up one level to reach the 'test' directory
    const destinationPath = path.join(destinationFolder, sourceFile);

    const readable = createReadStream(sourcePath);
    const writable = createWriteStream(destinationPath);

    // Attach error event to the writable stream
    writable.on("error", (err) => {
      console.error(`Error writing file ${destinationPath}: ${err.message}`);
    });

    // Use a Promise to wait for the copying to complete
    await new Promise((resolve, reject) => {
      readable.pipe(writable);

      // Use the 'end' event of the readable stream to signal completion
      readable.on("end", resolve);

      // Also handle errors on the readable stream
      readable.on("error", (err) => {
        console.error(`Error reading file ${sourcePath}: ${err.message}`);
        reject(err);
      });
    });

    console.log(`File copied successfully: ${destinationPath}`);
  } catch (err) {
    console.error(`Error copying file: ${err.message}`);
  }
};
