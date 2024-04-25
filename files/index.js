// TODO: Citeste lista fisierelor dintr-un director si creeaza un fisier nou, in format CSV, cu lista lor:

import { promises as fs } from "fs";

const folderName = "./test";
const filename = "log.csv";

async function main() {
  try {
    // Apelarea funcției logFilesInDirectory pentru a scrie lista de fișiere în fișierul CSV:
    await logFilesInDirectory(folderName);
    console.log("Fisierul a fost scris cu succes.");

    // Citirea conținutului fișierului log.csv:
    const content = await fs.readFile(filename, "utf-8");
    console.log("Conținutul fișierului log.csv:");
    console.log(content);
  } catch (error) {
    console.error(error);
  }
}

// Definirea funcției pentru a scrie lista de fișiere în fișierul CSV:
async function logFilesInDirectory(folderName) {
  try {
    // Citirea listei de fișiere din directorul specificat:
    const files = await fs.readdir(folderName);
    // Construirea textului pentru fișierul CSV, excluzând fișierele care nu sunt de tipul .txt:
    const fileText = files
      .filter((file) => file.includes(".txt"))
      .map((file) => file.replace(".txt", ""))
      .join(",");

    // Scrierea textului în fișierul CSV:
    await fs.writeFile(filename, fileText);
  } catch (error) {
    throw new Error(`Eroare la scrierea fisierului: ${error.message}`);
  }
}

main();
