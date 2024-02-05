import os from "os";

export const getUsername = () => {
  const username = os.userInfo().username;
  console.log(`Current System User Name: ${username}`);
};
