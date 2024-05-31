import request from "supertest";
import express from "express";

//! Import router-ul create in aplicatie:
import productsRouter from "../routes/api/products";

//! eslint-disable-next-line (express vs. Express):
const app = new express();

app.use("/api/products", productsRouter);

describe("Products Router", function () {
  it("responds to /", async () => {
    const res = await request(app).get("/api/products");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(401);
  });
});
