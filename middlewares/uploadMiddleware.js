// // server/middlewares/uploadMiddleware.js
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: "dlsd-reports", // optional
//     allowed_formats: ["pdf", "jpg", "png", "docx", "pptx"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const path = require("path");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const ext = path.extname(file.originalname).toLowerCase();

    // Common image extensions
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

    const isImage = imageExtensions.includes(ext);

    return {
      folder: "dlsd-reports",
      resource_type: isImage ? "image" : "raw", // 🔀 smart handling
      allowed_formats: ["pdf", "jpg", "png", "docx", "pptx"],
      public_id: file.originalname.split(".")[0], // optional
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
