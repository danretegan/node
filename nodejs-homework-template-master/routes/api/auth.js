import express from "express";
import AuthController from "../../controller/authController.js";
import FileController from "../../controller/fileController.js";
import { STATUS_CODES } from "../../utils/constants.js";
import User from "../../models/user.js";
import colors from "colors";
import { respondWithError } from "../../utils/respondWithError.js";

const router = express.Router();

//TODO LOGIN:
//! POST localhost:3000/api/auth/login/
//TODO Modificam login-ul sa verifice daca ceea ce introduce utilizatorul la logare corespunde cu cee ce este in baza de date:
router.post("/login", async (req, res, next) => {
  try {
    //* req.body va conține toate câmpurile de text:
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
    //* req.body va conține toate câmpurile de text:
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
    respondWithError(res, error, STATUS_CODES.error);
  }
});

//TODO LOGOUT:
//! POST localhost:3000/api/auth/logout/
router.get("/logout", AuthController.validateAuth, async (req, res, next) => {
  try {
    const header = req.get("authorization");
    if (!header) {
      throw new Error("E nevoie de autentificare pentru aceasta ruta.");
    }
    console.log(colors.bgYellow.italic.bold("--- Logout! ---"));
    const token = header.split(" ")[1];
    const payload = AuthController.getPayloadFromJWT(token);

    const filter = { email: payload.data.email };
    const update = { token: null };
    await User.findOneAndUpdate(filter, update);

    res.status(204).send();
  } catch (error) {
    respondWithError(res, error, STATUS_CODES.error);
  }
});

//TODO USERS/CURRENT:
//! POST localhost:3000/api/auth/users/current/
router.get(
  "/users/current",
  AuthController.validateAuth,
  async (req, res, next) => {
    try {
      const header = req.get("authorization");
      if (!header) {
        throw new Error("E nevoie de autentificare pentru aceasta ruta.");
      }
      console.log(colors.bgYellow.italic.bold("--- /user/current: ---"));
      const token = header.split(" ")[1];
      const payload = AuthController.getPayloadFromJWT(token);

      const user = await User.findOne({
        email: payload.data.email,
      });

      res.status(STATUS_CODES.success).json({
        email: user.email,
        user: user.role,
      });
    } catch (error) {
      respondWithError(res, error, STATUS_CODES.error);
    }
  }
);

//TODO AVATAR:
//! POST localhost:3000/api/auth/avatar/
router.patch(
  "/avatar",
  [AuthController.validateAuth, FileController.uploadFile],
  async (req, res) => {
    try {
      const response = await FileController.processAvatar(req, res);
      res.status(STATUS_CODES.success).json(response);
    } catch (error) {
      respondWithError(res, error, STATUS_CODES.error);
    }
  }
);

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
