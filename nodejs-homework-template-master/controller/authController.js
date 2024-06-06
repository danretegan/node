import colors from "colors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import passport from "passport";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import sendWithSendGrid from "../utils/sendEmail.js";

const secretForToken = process.env.TOKEN_SECRET;

async function login(data) {
  console.log(colors.bgYellow.italic.bold("--- Login: ---"));

  const { email, password } = data;

  //* Trebuie să se țină cont de faptul că utilizatorul nu va putea să se autentifice până când adresa lui de e-mail nu a fost verificată. Deci adaugam si 'verify: true':
  const user = await User.findOne({ email: email, verify: true });

  if (!user) {
    throw new Error(
      "The username does not exist or the email was not yet validated!"
    );
  }

  const isMatching = await bcrypt.compare(password, user.password);

  if (isMatching) {
    const token = jwt.sign(
      {
        data: user,
      },
      secretForToken,
      { expiresIn: "1h" }
    );

    //TODO Actualizam tokenul in baza de date:
    const filter = { email: email };
    const update = { token: token };
    await User.findOneAndUpdate(filter, update);

    return token;
  } else {
    throw new Error("Email is not matching!");
  }
}

//TODO SIGNUP:
async function signup(data) {
  console.log(colors.bgYellow.italic.bold("--- Signup: ---"));

  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(data.password, saltRounds);
  const userAvatar = gravatar.url(data.email);

  //! implementez o functie care sa genereze un token:
  const token = uuidv4();

  const newUser = new User({
    email: data.email,
    password: encryptedPassword,
    role: "buyer",
    token: null,
    avatarURL: userAvatar,
    //! Adaugam la noul user:
    verificationToken: token,
    verify: false,
  });

  //! Apelez functia sendWithSendGrid():
  sendWithSendGrid(data.email, token);

  return User.create(newUser);
}

// TODO functia de verificare token, jwt.verify();
function validateJWT(token) {
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

function getPayloadFromJWT(token) {
  try {
    const payload = jwt.verify(token, secretForToken);

    return payload;
  } catch (err) {
    console.error(err);
  }
}

function validateAuth(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (!user || err) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Unauthorized",
        data: "Unauthorized",
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

async function getUserByValidationToken(token) {
  const user = await User.findOne({
    verificationToken: token,
    verify: false,
  });

  if (user) {
    return true;
  }

  return false;
}

async function updateToken(email, token) {
  token = token || uuidv4();

  await User.findOneAndUpdate({ email: email }, { verificationToken: token });

  sendWithSendGrid(email, token);
}

const AuthController = {
  login,
  signup,
  validateJWT,
  getPayloadFromJWT,
  validateAuth,
  getUserByValidationToken,
  updateToken,
};

export default AuthController;
