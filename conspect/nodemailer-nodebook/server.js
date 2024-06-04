const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  res.render("index");
});

app.post("/", (req, res, next) => {
  const { email, name, text } = req.body;
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "goitnodejs@meta.ua",
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "goitnodejs@meta.ua",
    to: email,
    subject: "Nodemailer test",
    text: `${text}, Expeditor: ${name}`,
  };

  transporter
    .sendMail(emailOptions)
    .then((info) => res.render("done"))
    .catch((err) => next(err));
});

app.use(function (req, res, next) {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || "3000";
app.listen(port, () => {
  console.log("Server start");
});
