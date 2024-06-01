/**
//! Ruleaza comanda:
//! npm run test:dev /__tests__/routes/products.test.js
 */

import express from "express";
import request from "supertest";
import passport from "passport";
import { jest } from "@jest/globals";
import mockingoose from "mockingoose";

//! Import router-ul create in aplicatie:
import productsRouter from "../../routes/api/products.js";
import Product from "../../models/products.js";
import { mockProducts } from "../constants/mockProducts.js";

//! Folosim jest.mock pentru a suprascrie modulul authController.js. Definim o funcție validateAuth care pur și simplu apelează next(), trecând la următorul middleware fără a face nimic:
jest.mock("../../controller/authController.js", () => ({
  validateAuth: (_, __, next) => next(),
}));

//! eslint-disable-next-line (express vs. Express):
const app = new express();
app.use("/api/products", productsRouter);

describe("Products Router", function () {
  //! Check if auth works, case 401:
  it("responds to /api/products/ with 401", async () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback("This is an error", null);
      }
    );

    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(401);
    expect(res.body?.message).toEqual("Unauthorized");
  });

  //! Check if auth works, case 200:
  it("responds to /api/products/ with 200", async () => {
    passport.authenticate = jest.fn(
      (authType, options, callback) => (req, res, next) => {
        callback(null, { user: "mockUser" });
        next();
      }
    );

    mockingoose(Product).toReturn(mockProducts, "find");

    const res = await request(app).get("/api/products");

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      message: "Lista a fost returnata cu succes",
      data: mockProducts,
    });
  });
});
