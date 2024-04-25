const readline = require("readline");
const fs = require("fs").promises;

// modulul commander este o soluție complexă pentru crearea interfețelor în linia de comandă:
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
// Extragem numele fișierului de înregistrare a rezultatelor din opțiunile programului:
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

// Validam datele introduse:
const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Introduceți numărul!".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Numărul trebuie să fie în intervalul 1 - 10".red);
    return false;
  }
  return true;
};

// Functia de scriere a rezultatului in fisierul specificat (implicit results.txt):
const log = async (data) => {
  try {
    // Adăugăm rezultatul în fișierul specificat:
    await fs.appendFile(logFile, `${data}\n`);
    console.log(
      `S-a reușit salvarea rezultatului într-un fișier ${logFile}`.green
    );
  } catch (err) {
    console.log(`Nu s-a putut salva fișierul ${logFile}`.red);
  }
};

// Nucleul jocului: se utilizează interfața readline pentru a cere utilizatorului să introducă numere și se reacționează la aceste introduceri:
const game = () => {
  rl.question(
    "Introdu un număr de la 1 la 10 pentru a ghici răspunsul: ".yellow,
    (value) => {
      // Convertim valoarea introdusă într-un număr:
      let a = +value;
      if (!isValid(a)) {
        // Dacă valoarea nu este validă, se cere din nou introducerea unui număr:
        game();
        return;
      }
      count += 1;
      // Verificăm dacă numărul introdus este corect:
      if (a === mind) {
        console.log("Felicitări, ai ghicit numărul în %d pași)".green, count);
        // Se înregistrează rezultatul în fișierul specificat:
        log(
          `${new Date().toLocaleDateString()}: Felicitări, ai ghicit numărul în ${count} pași`
        ).finally(() => rl.close());
        return;
      }
      console.log("Nu ai ghicit, încearcă din nou".red);
      game();
    }
  );
};

game();
