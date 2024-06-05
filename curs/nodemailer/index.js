import { sendEmailTo } from "./sendEmailTo.js";
import dotenv from "dotenv";

dotenv.config();

const username = "Dan Retegan";
const email = process.env.SEND_TO_EMAIL;

sendEmailTo(username, email);
