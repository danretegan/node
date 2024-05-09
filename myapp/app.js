import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//TODO Transmiterea unui parametru la o adresă URL(:id):
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

//TODO editarea datelor pentru un utilizator ar putea arăta astfel:
app.patch("/user/:userid", (req, res) => {
  const id = req.params.userid;
  // efectuează acțiunile necesare
});

//TODO Utilizarea parametrilor de solicitare GET:
//? foloseste in browser: http://localhost:3000/contacts?skip=0&limit=10
//* Ruta care acceptă parametri de interogare:
app.get("/contacts", (req, res) => {
  const { skip, limit } = req.query;
  console.log(req.query);

  //! Simulăm datele de contact:
  const contacts = [];
  for (let i = parseInt(skip); i < parseInt(skip) + parseInt(limit); i++) {
    contacts.push(`Contact ${i}`);
  }

  res.json(contacts);
});
