const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Cum te numesti?", (answer) => {
  console.log(`Incantat de cunostinta, ${answer}`);
  // Inchidem interfata readline:
  rl.close();
});
