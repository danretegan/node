import multer from "multer";
import Jimp from "jimp";
import fs from "fs";
import path from "path";
import User from "../models/user.js";

const storage = multer.diskStorage({
  destination: "/tmp/",
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

// TODO Functia UPLOAD FILE:
const uploadFile = multer({ storage: storage }).single("avatar");

// TODO Functia PROCESS AVATAR:
async function processAvatar(req, res) {
  //   console.dir(req);
  //   console.dir(res);
  //! 1.Obținerea ID-ul utilizatorului:
  //? (presupunând că ai middleware de autentificare)
  const userId = req.user.id;

  try {
    //! 2.Procesează avatarul cu Jimp:
    //* req.file este fișierul 'avatar'.
    const avatar = await Jimp.read(req.file.path);
    avatar.resize(250, 250).quality(80).write(req.file.path);

    //! 3.Generarea unui nou nume pentru fișier:
    //* Obține extensia fișierului original: path.extname(req.file.originalname).
    const newFilename = `${userId}_${Date.now()}${path.extname(
      req.file.originalname
    )}`;

    //! 4.Construirea noii căi pentru fișier:
    const newPath = path.normalize(path.join("public", "avatars", newFilename));

    //! 5.Mutarea fișierului (rename):
    await fs.promises.rename(req.file.path, newPath);

    //! 6.Actualizarea URL-ului avatarului în baza de date:
    await User.findByIdAndUpdate(userId, { avatarURL: newPath });

    //! 7.Construirea rezultatului și returnarea acestuia:
    const result = { avatarUrl: newPath };

    return result;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

const FileController = {
  uploadFile,
  processAvatar,
};

export default FileController;
