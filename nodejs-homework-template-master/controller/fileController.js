import AuthController from "./authController.js";
import multer from "multer";
const FileController = {
  uploadFile,
};

function uploadFile(req, res, next) {
  AuthController.validateAuth(req, res);

  //* Configuram Multer.
  //* Cream folder tmp la radacina proiectului.
  //* Folosim jimp -> 250x250.
  //* Copiem fisierul nou creat in folderul /public/avatars.
  //* Salvam in baza de date. (salvam URL-ul rezultat /avatars/nume_fisier in campul avatarURL al utilizatorului)

  next();
}

export default FileController;
