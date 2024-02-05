import path from "path";
import { cwd } from "process";

export const goUp = () => {
  const currentDirectory = cwd();
  const parentDirectory = path.resolve(currentDirectory, "..");

  if (currentDirectory !== parentDirectory) {
    process.chdir(parentDirectory);
    console.log(`Current directory: ${process.cwd()}`);
  } else {
    console.log("Already in the root directory. Cannot go up.");
  }
};
