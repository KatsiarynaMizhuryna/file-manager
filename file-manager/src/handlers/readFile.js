import fs from "fs";

export const cat = (filePath, currentDirectory) => {
  const readableStream = fs.createReadStream(filePath, { encoding: "utf8" });

  readableStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readableStream.on("end", () => {
    console.log(`You are currently in ${currentDirectory}`);
  });

  readableStream.on("error", (error) => {
    console.error(`Error reading file: ${error.message}`);
  });
};
