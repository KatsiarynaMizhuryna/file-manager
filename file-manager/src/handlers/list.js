import fs from "fs";
import { cwd } from "process";

export const ls = () => {
  const currentDirectory = cwd();

  fs.readdir(currentDirectory, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }
    const folders = files.filter((file) => file.isDirectory());
    const regularFiles = files.filter((file) => file.isFile());

    folders.sort((a, b) => a.name.localeCompare(b.name));
    regularFiles.sort((a, b) => a.name.localeCompare(b.name));
    const tableData = [
      ...folders.map((file) => ({
        Name: file.name,
        Type: "directory",
      })),
      ...regularFiles.map((file) => ({
        Name: file.name,
        Type: "file",
      })),
    ];

    console.table(tableData, ["Name", "Type"]);
  });
};
