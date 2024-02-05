import { createInterface } from "readline";
import { cwd } from "process";
import { copyFile } from "./handlers/copyFile.js";
import { goUp } from "./handlers/up.js";
import { changeDirectory } from "./handlers/changeDirectory.js";
import { ls } from "./handlers/list.js";
import { cat } from "./handlers/readFile.js";

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
      console.log(`You are currently in ${currentDirectory}`);
      break;
    case "up":
      goUp();
      updateCurrentDirectory();
      break;
    case "cd":
      if (args.length === 1) {
        currentDirectory = changeDirectory(args[0], currentDirectory);
      } else {
        console.log("Invalid input. Please provide a directory path.");
      }
      break;
    case "cp":
      if (args.length === 2) {
        const [sourcePath, destinationPath] = args;
        copyFile(sourcePath, destinationPath);
      } else {
        console.log(
          "Invalid input. Please provide source and destination paths."
        );
      }
      break;
    case "ls":
      ls();
      updateCurrentDirectory();
      break;
    case "cat":
      cat(args[0], currentDirectory);
      break;

    default:
      console.log("Invalid input. Please enter a valid command.");
  }
};

promptUser();
