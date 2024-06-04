const nodemailer = require("nodemailer");

require("dotenv").config();

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
  to: "noresponse@gmail.com",
  subject: "Nodemailer test",
  text: "Hello. We are testing sending emails!",
};

transporter
  .sendMail(emailOptions)
  .then((info) => console.log(info))
  .catch((err) => console.log(err));
