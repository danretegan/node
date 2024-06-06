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
      user: {
        email: user.email,
        role: user.role,
        avatarURL: user.avatarURL,
      },
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

// TODO verify/:verificationToken:
//! GET /api/auth/verify/:verificationToken
router.get("/verify/:verificationToken", async (req, res) => {
  //* 'req.params.verificationToken' extrage partea ':verificationToken' din URL și o stochează în variabila 'token':
  const token = req.params.verificationToken;

  //* se apelează funcția getUserByValidationToken din AuthController cu token-ul extras. Aceasta returnează true dacă utilizatorul este găsit și false dacă nu:
  const hasUser = await AuthController.getUserByValidationToken(token);

  if (hasUser) {
    try {
      await User.findOneAndUpdate(
        //* caută un utilizator în baza de date care are verificationToken egal cu token. Dacă găsește un astfel de utilizator, actualizează câmpul verify la true:
        { verificationToken: token },
        { verify: true }
      );
    } catch (error) {
      throw new Error(
        "The username could not be found or it was already validated."
      );
    }

    //* Dacă actualizarea este reușită, serverul trimite un răspuns cu statusul 200 și urmatorul mesaj:
    res.status(200).send({
      message: "Verification succsessful",
    });
  } else {
    //* Dacă hasUser este false (adică utilizatorul nu a fost găsit), se apelează funcția respondWithError pentru a trimite un răspuns de eroare. Mesajul de eroare este "User not found":
    respondWithError(res, new Error("User not found"), STATUS_CODES.error);
  }
});

// TODO @ POST /verify/
//! POST /api/auth/verify/
//? /api/users/verify/
router.post("/verify", async (req, res) => {
  try {
    const isValid = req.body?.email;
    const email = req.body?.email;

    if (isValid) {
      AuthController.updateToken(email);

      res.status(200).json({
        message: "Verification email sent!",
      });
    } else {
      throw new Error("The email field is required!");
    }
  } catch (error) {
    respondWithError(res, error, STATUS_CODES.error);
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
