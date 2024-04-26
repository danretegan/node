import colors from "colors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import { randomUUID } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = `${__dirname}\\db\\products.json`;
console.log(productsPath.green);

//TODO CRUD:

//! Read:
async function getProducts() {
  try {
    console.log("GET Products:".bgBlue);

    const contents = await readFile(productsPath, { encoding: "utf8" });
    const products = JSON.parse(contents);
    console.log("Number of products:", products.length);
    console.table(products);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

// getProducts();

//! Create:

/**
{
    "name": "Adidas Galaxy - Black/White",
    "size": 40,
    "type": "shoe"
},
 */

async function createProducts(product) {
  try {
    const contents = await readFile(productsPath, { encoding: "utf8" });
    const products = JSON.parse(contents);
    const newProductId = randomUUID();
    const isValid = product?.name && product?.size && product?.type;

    if (!isValid) {
      throw new Error("The data are not vadid!");
    }

    const newProduct = {
      id: newProductId,
      ...product,
    };
    console.log(newProduct);
    products.push(newProduct);
    const parsedProducts = JSON.stringify(products);
    await writeFile(productsPath, parsedProducts);
    console.log("The product has been created succesfuly!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

createProducts({
  name: "xxx",
  size: 55,
  type: "yyy",
});
