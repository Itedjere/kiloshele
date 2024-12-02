import multer from "multer";
import path from "node:path";

// Set up storage to save files locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists in your project
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Unique filename
  },
});

const fileFilter = (req, file, cb) => {
  // Regular expression for allowed extensions
  const allowedExtensions = /jpeg|jpg|png|gif|mp4|avi|mkv|mov/;

  // Validate file extension
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Validate MIME type
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/x-msvideo", // MIME for .avi
    "video/x-matroska", // MIME for .mkv
    "video/quicktime", // MIME for .mov
  ];
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
    cb(null, true); // File is valid
  } else {
    cb(new Error("Only images and videos are allowed"), false); // Invalid file
  }
};

// Set up Multer with file size limit (e.g., 5 MB)
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});
