import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact page</h1> Am introdus parametrul: ${req.params.id}`);
});

//TODO Middleware:
app.use((req, res, next) => {
  console.log("\x1b[34mMiddleware-ul nostru\x1b[0m"); //text cu albastru
  next();
});

//TODO Pentru a porni serverul se apelează metoda app.listen() căruia i se transmite numărul portului:
app.listen(3000, () => {
  console.log("\x1b[31mExample app listening on port 3000!\x1b[0m"); //text cu rosu
});

app.patch("/user/:userid", (req, res) => {
  const id = req.params.userid;
  // efectuează acțiunile necesare
});
