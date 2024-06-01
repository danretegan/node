/**
//! Ruleaza comanda:
//! npm run test:dev /__tests__/routes/auth.test.js
 */

import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";
import bodyParser from "body-parser";
import mockingoose from "mockingoose";
import bcrypt from "bcrypt";
import authRouter from "../../routes/api/auth.js";
import User from "../../models/user.js";

//! Folosim jest.mock pentru a suprascrie modulul authController.js. Definim o funcție validateAuth care pur și simplu apelează next(), trecând la următorul middleware fără a face nimic:
jest.mock("../../controller/authController.js", () => ({
  validateAuth: (_, __, next) => next(),
}));

//! Creăm un mock pentru funcția bcrypt.compare folosind jest.fn(). Trebuie sa suprascriem funcția bcrypt.compare originală cu acest mock:
const bcryptCompareMock = jest.fn();
bcrypt.compare = bcryptCompareMock;

//! eslint-disable-next-line (express vs. Express):
const app = new express();

//! Adăugăm middleware-urile bodyParser pentru a putea procesa cererile JSON și urlencoded:
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

// process.env.TOKEN_SECRET = "secret";

//! BLOCUL DE TESTARE:
describe("Auth Routes", function () {
  //! După fiecare test, resetăm mock-urile pentru modelul User folosind mockingoose:
  afterEach(() => {
    mockingoose(User).reset();
  });

  it("responds to /api/auth/login", async () => {
    //! Setăm mock-ul bcryptCompareMock să rezolve valoarea true, simulând o comparație de parole reușită:
    bcryptCompareMock.mockResolvedValue(true);

    //! Folosind mockingoose, configurăm modelul User să returneze anumite valori atunci când sunt apelate metodele findOne și findOneAndUpdate. Pot modifica codul astfel incat sa tratez toate cazurile de eroare, modificand ce returneaza findOne:
    mockingoose(User).toReturn(
      {
        email: "test@test.com",
        password: "parolaDinDbHashed",
        role: "buyer",
        avatarURL: "/public/avatar/image.png",
      },
      "findOne"
    );
    // .toReturn(
    //   {
    //     email: "test@test.com",
    //   },
    //   "findOneAndUpdate"
    // );

    //! Trimitem o cerere POST către /api/auth/login cu un corp JSON ce conține email-ul și parola utilizatorului de test. Setăm headerele Content-Type și Accept la application/json:
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "parolaDinTest",
    });
    // .set("Content-Type", "application/json")
    // .set("Accept", "application/json");

    //! Răspunsul trebuie să aibă status code 200:
    expect(res.statusCode).toBe(200);

    //! Răspunsul trebuie să returneze un token:
    //!(nu ne intereseaza valoarea efectiva a JWT-ului)
    expect(res.body).toHaveProperty("token");

    //! Răspunsul trebuie să returneze un obiect user cu 3 câmpuri: email, role si avatarURL, cu valori de tip String:
    expect(res.body).toHaveProperty("user");
    expect(typeof res.body.user.email).toBe("string");

    //! Verificam si ca rolul e fie "buyer", fie "seller":
    expect(["buyer", "seller"]).toContain(res.body.user.role);
    expect(typeof res.body.user.avatarURL).toBe("string");
  });
});
