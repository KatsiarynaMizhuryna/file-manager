import { createInterface } from "readline";
import { cwd } from "process";
import { copyFile } from "./handlers/copyFile.js";
import { goUp } from "./handlers/up.js";
import { changeDirectory } from "./handlers/changeDirectory.js";
import { ls } from "./handlers/list.js";
import { cat } from "./handlers/readFile.js";
import { rename } from "./handlers/renameFile.js";
import { move } from "./handlers/moveFile.js";
import { deleteFile } from "./handlers/deleteFile.js";
import { getEOL } from "./handlers/getEOL.js";
import { getCPUs } from "./handlers/getCPUs.js";
import { getHomeDir } from "./handlers/getHomeDirectory.js";
import { getUsername } from "./handlers/getUsername.js";
import { getArchitecture } from "./handlers/getArchitecture.js";
import { calculateHash } from "./handlers/calculateHash.js";
import { compress } from "./handlers/compressFile.js";
import { decompress } from "./handlers/decompressFile.js";

const args = process.argv.slice(2);
const usernameArgIndex = args.indexOf("--username");
const username = args[usernameArgIndex + 1].replace("--username=", "");
let currentDirectory = cwd();

console.log(
  `Welcome to the File Manager, ${username}!\nYou are currently in ${currentDirectory}`
);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});
process.on("exit", () =>
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
);
process.on("SIGINT", () => process.exit(0));

const promptUser = () => {
  rl.prompt();
  rl.on("line", (line) => {
    const command = line.trim();
    processCommand(command);
    rl.prompt();
  });
};

const updateCurrentDirectory = () => {
  currentDirectory = cwd();
  console.log(`You are currently in ${currentDirectory}`);
};

const processCommand = (command) => {
  const [cmd, ...args] = command.split(" ");
  switch (cmd) {
    case ".exit":
      process.exit();
    case "pwd":
      console.log(cmd);
      updateCurrentDirectory();
      break;
    case "up":
      goUp();
      updateCurrentDirectory();
      break;
    case "cd":
      currentDirectory = changeDirectory(args[0], currentDirectory);
      updateCurrentDirectory();
      break;
    case "cp":
      copyFile(args[0], args[1]);
      updateCurrentDirectory();
      break;
    case "ls":
      ls();
      updateCurrentDirectory();
      break;
    case "cat":
      cat(args[0], currentDirectory);
      updateCurrentDirectory();
      break;
    case "rn":
      rename(args[0], args[1]);
      updateCurrentDirectory();
      break;
    case "mv":
      move(args[0], args[1]);
      updateCurrentDirectory();
      break;
    case "rm":
      deleteFile(args[0]);
      updateCurrentDirectory();
      break;
    case "os":
      switch (args[0].slice(2).toLowerCase()) {
        case "eol":
          getEOL();
          updateCurrentDirectory();
          break;
        case "cpus":
          getCPUs();
          updateCurrentDirectory();
          break;
        case "homedir":
          getHomeDir();
          updateCurrentDirectory();
          break;
        case "username":
          getUsername();
          updateCurrentDirectory();
          break;
        case "architecture":
          getArchitecture();
          updateCurrentDirectory();
          break;
      }
      break;
    case "hash":
      calculateHash(args[0]);
      updateCurrentDirectory();
      break;
    case "compress":
      compress(args[0], args[1]);
      updateCurrentDirectory();
      break;
    case "decompress":
      decompress(args[0], args[1]);
      updateCurrentDirectory();
      break;

    default:
      console.log("Invalid input. Please enter a valid command.");
  }
};

promptUser();
