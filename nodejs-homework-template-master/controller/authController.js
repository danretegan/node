import colors from "colors";
import jwt from "jsonwebtoken";
import "dotenv/config";

const AuthController = {
  login,
  validateJWT,
};

const secretFromToken = process.env.TOKEN_SECRET;

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
    secretFromToken,
    { expiresIn: "1h" }
  );

  return token;
}

// TODO functia de verificare token, jwt.verify();
function validateJWT(token) {
  try {
    let isAuthenticated = false;

    // invalid token - synchronous
    jwt.verify(token, secretFromToken, (err, _decoded) => {
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
