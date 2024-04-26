import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { createProducts, getProducts } from "./productsService.js";

const argv = yargs(hideBin(process.argv)).parse();

// node index.js --action list
// node index.js --action add --name Mango --type shoes --size 46

const action = argv.action;
console.log(action);

switch (action) {
  case "list":
    getProducts();
    break;

  case "add":
    const hasAllArguments = argv.name && argv.type && argv.size;

    if (!hasAllArguments) {
      console.log("For adding an item we need name, type and size".bgRed);
    }

    const product = {
      name: argv.name,
      type: argv.type,
      size: parseInt(argv.size),
    };

    createProducts(product);
    break;

  default:
    console.error(`This command ${action} is not supported!`.bgRed);
}
