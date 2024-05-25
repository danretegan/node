import express from "express";
import AuthController from "../../controller/authController.js";
import { STATUS_CODES } from "../../utils/constants.js";
import User from "../../models/user.js";

const router = express.Router();

//TODO LOGIN:
//! POST localhost:3000/api/auth/login/
//TODO Modificam login-ul sa verifice daca ceea ce introduce utilizatorul la logare corespunde cu cee ce este in baza de date:
router.post("/login", async (req, res, next) => {
  try {
    const isValid = checkLoginPayload(req.body);
    if (!isValid) {
      throw new Error("The login request is invalid.");
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Username or password is not correct",
        data: "Conflict",
      });
    }

    const token = await AuthController.login({ email, password });

    res.status(STATUS_CODES.success).json({
      message: "Utilizatorul a fost logat cu succes!",
      token: token,
    });
  } catch (error) {
    respondWithError(res, error, STATUS_CODES.error);
  }
});

//TODO SIGNUP:
//! POST localhost:3000/api/auth/signup/
router.post("/signup", async (req, res, next) => {
  try {
    const isValid = checkSignupPayload(req.body);

    if (!isValid) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "Incorrect email or password",
        data: "Bad request",
      });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }

    await AuthController.signup({ email, password });

    res.status(201).json({ message: "Utilizatorul a fost creat" });
  } catch (error) {
    throw new Error(error);
  }
});

export default router;

/**
 //TODO LOGIN:
 //! Validate Product Body (Login):
 */
function checkLoginPayload(data) {
  if (!data?.email || !data?.password) {
    return false;
  }

  return true;
}

/**
 //TODO SIGNUP:
 //! Validate Product Body:
 */
function checkSignupPayload(data) {
  if (!data?.email || !data?.password) {
    return false;
  }

  //TODO introducem ce alte conditii dorim, de ex ca parola sa aiba minim 8 caractere:
  if (data?.password < 8) {
    return false;
  }

  return true;
}

/**
 //! Handles Error Cases:
 */
function respondWithError(res, error) {
  console.error(error);
  res.status(STATUS_CODES.error).json({ message: `${error}` });
}
