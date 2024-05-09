// app.js
import express from "express";
import router from "./my-router.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware
app.use((req, res, next) => {
  console.log("\x1b[34mMiddleware-ul nostru\x1b[0m"); // text cu albastru
  next();
});

// Definirea rutelor folosind router-ul importat
app.use(router);

// Pentru a porni serverul se apelează metoda app.listen() căruia i se transmite numărul portului:
app.listen(3000, () => {
  console.log("\x1b[31mExample app listening on port 3000!\x1b[0m"); // text cu rosu
});
