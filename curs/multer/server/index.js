import express from "express";
import cors from "cors";

import multer from "multer";

const upload = multer({ dest: "uploads/" }).single("avatar");
const app = express();

app.use(cors());
app.get("/", (res) => {
  res.render("index", { title: "Express" });
});

app.post("/profile", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error(error);
      res.status(500).send("A aparut o eroare");
    } else if (err) {
      console.error(error);
      res.status(500).send("A aparut o eroare");
    }

    res.status(303).send("Fisierul a fost incarcat!");
    //* req.body va conține toate câmpurile de text:
    console.dir(req.body);

    /**
     //! Se poate salva: 
     //* Avatar: req.file, 
     //* Name: req.body.name, 
     //* Email: req.body.email
     
    //* Everything went fine.
     */
  });
});

console.log("Listening on port 3000...");
app.listen(3000);
