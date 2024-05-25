import colors from "colors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const AuthController = {
  login,
  signup,
  validateJWT,
};

const secretForToken = process.env.TOKEN_SECRET;

async function login() {
  console.log(colors.bgYellow.italic.bold("--- Login: ---"));

  // TODO Create collection in MongoDB for users + schema
  // TODO User is valid:

  const MOCK_USER_DATA = {
    username: "danretegan",
    name: "Dan Retegan",
    avatar: '<img src="" alt="test"/>',
  };

  const isValid = true;

  if (!isValid) {
    throw new Error("The username or passsword entered is not correct.");
  }

  // TODO functia de creare token, jwt.sign();
  const token = jwt.sign(
    {
      data: MOCK_USER_DATA,
    },
    secretForToken,
    { expiresIn: "1h" }
  );

  return token;
}

async function signup(data) {
  console.log(colors.bgYellow.italic.bold("--- Signup: ---"));

  //! criptam parola inainte de a o trimite in baza de date!
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(data.password, saltRounds);

  const newUser = new User({
    email: data.email,
    password: encryptedPassword,
    role: "buyer",
    token: null,
  });

  return User.create(newUser);
}

// TODO functia de verificare token, jwt.verify();
export function validateJWT(token) {
  try {
    let isAuthenticated = false;

    // invalid token - synchronous
    jwt.verify(token, secretForToken, (err, _decoded) => {
      if (err) {
        throw new Error(err);
      }

      isAuthenticated = true;
    });

    return isAuthenticated;
  } catch (err) {
    console.error(err);
  }
}

export default AuthController;
