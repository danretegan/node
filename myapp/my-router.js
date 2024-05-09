// my-router.js
import express from "express";
const router = express.Router();

//TODO Definim ruta default:
router.get("/", (req, res) => {
  res.send("Aceasta este ruta principala.");
});

//TODO definim ruta about:
router.get("/about", (req, res) => {
  res.send("Acesta este ruta about.");
});

//TODO definim ruta contact:
router.get("/contact", (req, res) => {
  res.send("Aceasta este ruta contact.");
});

//TODO definim ruta login:
router.get("/login", (req, res) => {
  res.send("Acesasta este ruta login.");
});

export default router;
