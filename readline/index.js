import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

console.log("---------------------");

const name = await rl.question("Cum te cheama? ");
const age = await rl.question("Cati ani ai? ");
const mood = await rl.question("Ce faci? ");

console.log(`Ma numesc ${name} si am ${age} de ani. Eu ${mood}!`);

rl.close();
