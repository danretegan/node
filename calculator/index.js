//! Modulul ES6 (import):
//TODO Creati un program Node.js care calculeaza suma, diferenta, produsul si impartirea a doua numere introduse de la tastatura (node index.js 1 2 +):
// console.dir(process.argv);

// Importam functiile folosind ES modules (import):
import { isNumber } from "./isNumber.js";
import { computeResult } from "./computeResult.js";

// Preluam argumentele. Primele 2 argumente le transformam in numere:
const primulNumar = Number(process.argv[2]);
const alDoileaNumar = Number(process.argv[3]);
const operator = process.argv[4];

// Facem verificari:
// verificam daca s-au introdus cele 3 argumente:
if (process.argv.length !== 5) {
  console.error(
    "Te rog sa introduci 2 numere urmate de operatia care doresti sa se efectueze."
  );
  // In loc de `return` (0=succes):
  process.exit(0);
}
// Verificam daca primele 2 argumente sunt numere:
if (!isNumber(primulNumar) || !isNumber(alDoileaNumar)) {
  console.error("Introduceti un numar!");
  // In loc de `return` (1=eroare):
  process.exit(1);
}
// Verificam daca operatorul introdus este unul dintre "+", "-", "*", "/":
if (!["+", "-", "*", "/"].includes(operator)) {
  console.error(
    `Operatorul introdus: "${operator}" nu este cunoscut! Introduceti: +, -, * sau /. Va multumesc.`
  );
  // In loc de `return` (0=succes):
  process.exit(0);
}

// Apelam functia:
const result = computeResult(primulNumar, alDoileaNumar, operator);
// Afisam rezultatul:
console.table(`${primulNumar} ${operator} ${alDoileaNumar} = ${result}`);
