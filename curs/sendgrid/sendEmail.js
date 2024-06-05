import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export default async function sendWithSendGrid(email) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: process.env.SEND_FROM_EMAIL,
    subject: "Sending with SendGrid is fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js or Express</strong>",
    //* atentie: daca este html: +text: va functiona doar html:, daca NU este html: si este text: va functiona text:!
  };

  // ES6
  try {
    await sgMail.send(msg);
    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    if (error?.response) {
      console.error(error?.response.body);
    } else {
      console.error(error);
    }
  }
}
