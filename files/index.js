//TODO Citeste lista fisierelor din director si creeaza un fisier nou cu lista lor in format CSV

import { promises as fs } from "fs";

const folderName = "./";
const filename = "log.csv";

await logFilesInDirectory(folderName);

async function logFilesInDirectory() {
  try {
    const files = await fs.readdir(folderName);
    const fileText = files
      .filter((file) => file.includes(".txt"))
      .map((file) => file.replace(".txt", ""))
      .join(",");

    try {
      fs.writeFile(filename, fileText);
      console.log("Fisierul a fost scris cu succes.");
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
}
