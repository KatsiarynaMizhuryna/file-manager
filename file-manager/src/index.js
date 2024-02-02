import { createInterface } from "readline";
import { cwd } from "process";

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

const processCommand = (command) => {
  if (command === ".exit") {
    exitHandler();
  }
  if (command === "pwd") {
    console.log(`You are currently in ${currentDirectory}`);
  }
  console.log("Invalid input. Please enter a valid command.");
};

promptUser();
