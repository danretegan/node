import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/contact", (req, res) => {
  res.send("<h1>Contact page</h1>");
});

app.use((req, res, next) => {
  console.log("\x1b[34mMiddleware-ul nostru\x1b[0m"); //text cu albastru
  next();
});

app.listen(3000, () => {
  console.log("\x1b[31mExample app listening on port 3000!\x1b[0m"); //text cu rosu
});
