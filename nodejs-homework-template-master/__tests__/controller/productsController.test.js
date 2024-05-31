import ProductsController from "../../controller/productsController";
import mockingoose from "mockingoose";
import Product from "../../models/products";
import { mockProducts } from "../constants/mockProducts.js";

describe("ProductsController", () => {
  afterEach(() => {
    mockingoose(Product).reset();
  });

  it("listProducts", async () => {
    //! Setăm simularea pentru modelul Product:
    mockingoose(Product).toReturn(mockProducts, "find");

    //! Apelăm metoda listProducts din ProductsController:
    const result = await ProductsController.listProducts();

    // console.log("result:", result);
    // console.log("mockProducts:", mockProducts);
    //! Verificăm dacă rezultatul returnat conține datele simulate:
    expect(result).toMatchObject(mockProducts);

    //! Verificăm dacă numărul de produse întoarse este corect:
    expect(result.length).toBe(3);
  });
});
