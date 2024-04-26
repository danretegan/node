// const yargs = require("yargs/yargs");
// const { hideBin } = require("yargs/helpers");

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
// hideBin ascunde primele 2 argumente din argv.
const argv = yargs(hideBin(process.argv)).parse();

const folder = argv.folder;
const file = argv.file;

console.log(`This will copy file ${file} into ${folder} folder.`);
