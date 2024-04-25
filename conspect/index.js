const readline = require("readline");
const fs = require("fs").promisses;
const { program } = require("commander");
require("colors");

program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);

program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Introduceti numarul!".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Numarul trebuie sa fie in intervalul 1 - 10".red);
    return false;
  }
  return true;
};

const log = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(
      `S-a reusit salvarea rezultatulyui intr-un fisier! ${logFile}`.green
    );
  } catch (err) {
    console.log(`Nu s-a putut salva fisierul ${logFile}`.red);
  }
};

const game = () => {
  rl.question(
    "Introdu un numar de la 1 la 10 pentru a ghici raspunsul: ".yellow,
    (value) => {
      let a = +value;
      if (!isValid(a)) {
        game();
        return;
      }
      count += 1;
      if (a === mind) {
        console.log("Felicitari, ai ghicit numarul in %d pasi".green, count);
        log(
          `${new Date().toLocaleDateString()}: Felicitari, ai ghicit numarul in ${count} pasi`
        ).finally(() => rl.close());
        return;
      }
      console.log("Nu ai ghicit, incearca din nou".red);
      game();
    }
  );
};

game();
