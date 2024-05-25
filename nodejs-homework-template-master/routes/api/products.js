import express from "express";
import ProductsController from "../../controller/productsController.js";
import { STATUS_CODES } from "../../utils/constants.js";
import "../../passport.js";
import AuthController from "../../controller/authController.js";

const router = express.Router();

//TODO GET localhost:3000/api/products */
//TODO Refactorizare pentru a obtine lista de produse doar daca suntem autorizati:

router.get("/", AuthController.validateAuth, async (req, res, next) => {
  try {
    const products = await ProductsController.listProducts();

    res
      .status(STATUS_CODES.success)
      .json({ message: "Lista a fost returnata cu succes", data: products });
  } catch (error) {
    respondWithError(res, error);
  }
});

/* GET localhost:3000/api/products/:id */
router.get("/:id", async (req, res, next) => {
  try {
    const product = await ProductsController.getProductsById(req.params.id);
    if (!product) {
      throw new Error("Produsul nu a fost gasit");
    }
    res
      .status(STATUS_CODES.success)
      .json({ message: "Produsul a fost returnat cu succes", data: product });
  } catch (error) {
    respondWithError(res, error);
  }
});

/* POST localhost:3000/api/products/ */
router.post("/", async (req, res, next) => {
  try {
    const isValid = checkIsProductValid(req.body);
    if (!isValid) {
      throw new Error("Produsul introdus nu are toate campurile necesare.");
    }
    const product = req.body;
    await ProductsController.addProduct(product);
    res
      .status(201)
      .json({ message: `Produsul ${product.name} a fost adaugat cu succes.` });
  } catch (error) {
    respondWithError(res, error);
  }
});

/* DELETE localhost:3000/api/products/:id */
router.delete("/:id", async (req, res, next) => {
  try {
    await ProductsController.deleteProduct(req.params.id);

    res
      .status(STATUS_CODES.deleted)
      .json({ message: "Produsul a fost sters cu succes" });
  } catch (error) {
    respondWithError(res, error);
  }
});

/* PUT localhost:3000/api/products/:id */
router.put("/:id", async (req, res, next) => {
  //   try {
  //     const isValid = checkIsProductValid(req.body);
  //     if (!isValid) {
  //       throw new Error("Produsul introdus nu are toate campurile necesare.");
  //     }
  //     const product = req.body;
  //     const updatedProductId = req.params.id;
  //     await ProductsService.updateProduct(product, updatedProductId);
  //     res.status(200).json({
  //       message: `Produsul ${product.name} a fost modificat cu succes.`,
  //     });
  //   } catch (error) {
  //     respondWithError(res, error);
  //   }
});

/* Patch localhost:3000/api/products/:id */
router.patch("/:id", async (req, res, next) => {
  //   try {
  //     const partialProduct = req.body;
  //     const updatedProductId = req.params.id;
  //     await ProductsService.updateProductPartial(
  //       partialProduct,
  //       updatedProductId
  //     );
  //     res.status(200).json({
  //       message: `Produsul cu id-ul #${updatedProductId} a fost modificat partial cu succes.`,
  //     });
  //   } catch (error) {
  //     respondWithError(res, error);
  //   }
});

// TODO: Implement Delete Route

export default router;

/**
 * Validate Product Body
 */
function checkIsProductValid(product) {
  if (!product?.type || !product?.size || !product?.name) {
    return false;
  }

  return true;
}

/**
 * Handles Error Cases
 */
function respondWithError(res, error) {
  console.error(error);
  res.status(STATUS_CODES.error).json({ message: `${error}` });
}
