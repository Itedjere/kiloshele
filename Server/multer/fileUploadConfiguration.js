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
    cb(new Error("Only images and videos are allowed")); // Invalid file
  }
};

const expensesFileFilter = (req, file, cb) => {
  // Accept only specific file types
  const allowedTypes = [
    "image/*",
    "application/pdf",
    "application/vnd.ms-excel",
  ];
  if (
    allowedTypes.some((type) => file.mimetype.startsWith(type.split("/")[0]))
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"));
  }
};

const productsFileFilter = (req, file, cb) => {
  // Regular expression for allowed extensions
  const allowedExtensions = /jpeg|jpg|png|gif/;

  // Validate file extension
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Validate MIME type
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];
  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (mimetype && extname) {
    cb(null, true); // File is valid
  } else {
    cb(new Error("Only images and videos are allowed")); // Invalid file
  }
};

// Set up Multer with file size limit (e.g., 5 MB)
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB limit
});

// Set up Multer with file size limit (e.g., 5 MB)
export const expensesUpload = multer({
  storage: storage,
  fileFilter: expensesFileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB limit
});

// Set up Multer with file size limit (e.g., 5 MB)
export const productsUpload = multer({
  storage: storage,
  fileFilter: productsFileFilter,
  limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB limit
});
