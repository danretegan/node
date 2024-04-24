const fs = require("fs").promises;

fs.readFile(filename.txt, "utf-8")
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

fs.writeFile(filename, data, [optiuni]);
fs.appendFile(filename, data, [optiuni]);
fs.rename(oldPath, newPath);
fs.unlink(path, callback);
