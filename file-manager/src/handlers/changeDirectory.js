import { cwd } from "process";
import path from "path";

export const changeDirectory = (directoryPath, currentDirectory) => {
  try {
    process.chdir(path.resolve(directoryPath));
    const newCurrentDirectory = cwd();
    console.log(`Changed to directory: ${newCurrentDirectory}`);
    return newCurrentDirectory;
  } catch (error) {
    console.error(`Error changing directory: ${error.message}`);
    return currentDirectory;
  }
};
