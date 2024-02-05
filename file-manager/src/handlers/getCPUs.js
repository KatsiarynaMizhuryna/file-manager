import os from "os";

export const getCPUs = () => {
  const cpus = os.cpus();
  console.log(`Overall CPUs: ${cpus.length}`);

  cpus.forEach((cpu, index) => {
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${cpu.speed / 1000} GHz`);
    console.log("--------------");
  });
};
