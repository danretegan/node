// import (promises as fs) from fs;
import products from "./products.json";
import { v4 as uuidv4 } from "uuid";

const ProductsService = {
  listProducts,
  getProductsById,
  addProduct,
  updateProduct,
  updateProductPartial,
};

async function listProducts() {
  return products;
}

async function getProductsById(id) {
  return products.find((el) => el.id === id);
}

async function addProduct(product) {
  const preparedProduct = {
    id: uuidv4(),
    ...product,
  };

  products.push(preparedProduct);
  // Adaugare scriere in fisier
}

async function updateProduct(updatedProduct, productId) {
  if (!products.find((product) => product.id === productId)) {
    throw new Error("Produsul nu a fost gasit.");
  }

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      products[i] = { ...updatedProduct, productId };
      break;
    }
  }

  // TODO: Adaugare scriere in fisier
}

async function updateProductPartial(partialProduct, productId) {
  if (!products.find((product) => product.id === productId)) {
    throw new Error("Produsul nu a fost gasit.");
  }

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      products[i] = { ...products[i], ...partialProduct };
      break;
    }
  }
}

// const getContactById = async (contactId) => {};

// const removeContact = async (contactId) => {};

// const addContact = async (body) => {};

// const updateContact = async (contactId, body) => {};

export default ProductsService;
