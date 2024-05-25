import colors from "colors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import passport from "passport";

const AuthController = {
  login,
  signup,
  validateAuth,
};

const secretForToken = process.env.TOKEN_SECRET;

//TODO Modificam login-ul sa verifice daca ceea ce introduce utilizatorul la logare corespunde cu cee ce este in baza de date:
async function login(data) {
  console.log(colors.bgYellow.italic.bold("--- Login: ---"));

  const { email, password } = data;

  const user = await User.findOne({ email });

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
    throw new Error("Username is not matching!");
  }
}

//TODO SIGNUP:
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

export function validateAuth(req, res, next) {
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

export default AuthController;
