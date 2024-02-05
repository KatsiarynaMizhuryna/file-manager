import os from "os";

export const getEOL = () => {
  const eol = os.EOL;
  console.log(`Default End-Of-Line (EOL): ${JSON.stringify(eol)}`);
};
