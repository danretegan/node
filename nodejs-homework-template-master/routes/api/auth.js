import express from "express";
import AuthController from "../../controller/authController.js";
import { STATUS_CODES } from "../../utils/constants.js";
import colors from "colors";

const router = express.Router();

/* POST localhost:3000/api/auth/login/ */
router.post("/login", async (req, res, next) => {
  try {
    const isValid = checkLoginData(req.body);
    if (!isValid) {
      throw new Error("The login request is invalid.");
    }

    const data = req.body;
    const token = await AuthController.login(data);

    console.dir("token: " + token);

    res.status(STATUS_CODES.success).json({
      message: "Utilizatorul a fost logat cu succes!",
      token: token,
    });
  } catch (error) {
    respondWithError(res, error);
  }
});

export default router;

/**
 * Validate Product Body
 */
function checkLoginData(data) {
  if (!data?.username || !data?.password) {
    return false;
  }

  return true;
}

/**
 * Handles Error Cases
 */
function respondWithError(res, error) {
  console.error(error);
  res.status(STATUS_CODES.error).json({ message: `${error}` });
}
