const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

// const date = new Date().toISOString().slice(0, 16);

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// create the exported middleware object
let uploadMovies = util.promisify(uploadFile);

module.exports = uploadMovies;