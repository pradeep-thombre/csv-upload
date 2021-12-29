const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  // storing file in memory storage 
  storage: multer.memoryStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);  
    // checking file format csv or not 
    if (ext !== ".csv") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});