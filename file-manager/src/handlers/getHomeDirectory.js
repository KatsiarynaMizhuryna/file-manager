import os from "os";

export const getHomeDir = () => {
  const homeDir = os.homedir();
  console.log(`Home Directory: ${homeDir}`);
};
