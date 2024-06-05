import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export function sendEmailTo(username, email) {
  const nodemailerConfig = {
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: process.env.SEND_FROM_EMAIL,
      pass: process.env.SEND_FROM_PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(nodemailerConfig);

  let mailOptions = {
    from: process.env.SEND_FROM_EMAIL, //! adresa de unde trimit emailul.
    to: email, //! adresa unde trimit email.
    subject: "Email Transmit Test!",
    text: `Welcome to ${username} account! (de exemplu)`, //! Continutul efectiv al emailului.
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:" + info.response);
    }
  });
}
