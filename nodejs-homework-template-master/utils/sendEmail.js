import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export default async function sendWithSendGrid(email, token) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: email,
    from: "danretegan@outlook.com",
    subject: "Hello from ProductApp!",
    text: "and easy to do anywhere, even with Node.js",
    html: `Hello from <strong>ProductApp</strong> <br/> 
    <a href="localhost:3000/api/auth/verify/${token}">Click here</a> to validate your account. <br />
    Or insert the link in the URL: localhost:3000/api/auth/verify/${token}`,
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
