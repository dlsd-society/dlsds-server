// server/middlewares/uploadMiddleware.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "dlsd-reports", // optional
    allowed_formats: ["pdf", "jpg", "png", "docx", "pptx"],
  },
});

const upload = multer({ storage });

module.exports = upload;
