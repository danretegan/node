import AuthController from "./authController.js";
import multer from "multer";

const upload = multer({ dest: "tmp/" }).single("avatar");

const FileController = {
  uploadFile,
};

function uploadFile(req, res, next) {
  AuthController.validateAuth(req, res);

  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      throw new Error(`${err}`);
    }

    console.log(req.file);

    //* I can save Avatar:req.file, Name: req.body.name, Email: req.body.email
    //* Everything went fine.
  });

  //* Configuram Multer.
  //* Cream folder tmp la radacina proiectului.
  //* Folosim jimp -> 250x250.
  //* Copiem fisierul nou creat in folderul /public/avatars.
  //* Salvam in baza de date. (salvam URL-ul rezultat /avatars/nume_fisier in campul avatarURL al utilizatorului)

  next();
}

export default FileController;
