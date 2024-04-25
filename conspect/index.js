const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (cmd) => {
  console.log(`You just typed: ${cmd}`);
});
