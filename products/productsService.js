import colors from "colors";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const productsPath = `${__dirname}\\db\\products.json`;

//TODO CRUD:

//! Read:
export async function getProducts() {
  try {
    const contents = await readFile(productsPath, { encoding: "utf8" });
    const products = JSON.parse(contents);
    console.table(products);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//! Create:
export async function createProducts(product) {
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
    products.push(newProduct);
    const parsedProducts = JSON.stringify(products);
    await writeFile(productsPath, parsedProducts);
    console.log("The product has been created succesfuly!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//! Update:
export async function updateProduct(productId, updatedFields) {
  try {
    // Citim conținutul fișierului products.json
    const contents = await readFile(productsPath, { encoding: "utf8" });
    const products = JSON.parse(contents);

    // Găsim produsul în listă folosind productId
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    // Verificăm dacă produsul există
    if (productIndex === -1) {
      throw new Error("Product not found!");
    }

    // Actualizăm produsul cu noile valori
    Object.assign(products[productIndex], updatedFields);

    // Rescriem fișierul cu produsul actualizat
    await writeFile(productsPath, JSON.stringify(products));

    console.log("Product updated successfully!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//! Delete:
export async function deleteProduct(productId) {
  try {
    // Citim conținutul fișierului products.json
    const contents = await readFile(productsPath, { encoding: "utf8" });
    let products = JSON.parse(contents);

    // Găsim produsul în listă folosind productId
    const productIndex = products.findIndex(
      (product) => product.id === productId
    );

    // Verificăm dacă produsul există
    if (productIndex === -1) {
      throw new Error("Product not found!");
    }

    // Ștergem produsul din listă
    products = products.filter((product) => product.id !== productId);

    // Rescriem fișierul fără produsul șters
    await writeFile(productsPath, JSON.stringify(products));

    console.log("Product deleted successfully!".bgGreen);
  } catch (err) {
    console.log("There is an error:".bgRed);
    console.error(err);
  }
}

//? https://immerjs.github.io/immer/update-patterns/
