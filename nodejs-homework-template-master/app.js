import express from "express";
import logger from "morgan";
import cors from "cors";
import productsRouter from "./routes/api/products.js";
import authRouter from "./routes/api/auth.js";
import connectToDb from "./utils/connectToDb.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

connectToDb();

// TODO Configurăm framework-ul Express pentru a distribui fișierele statice din folderul public:
app.use(express.static("public"));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/products", productsRouter);

// TODO Ne cream o ruta auth, folosim un router nou pentru autentificare:
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
