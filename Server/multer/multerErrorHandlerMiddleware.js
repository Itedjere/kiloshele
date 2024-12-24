import multer from "multer";

export const multerErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return res
          .status(400)
          .json({ error: "File size too large. Maximum allowed size is 3MB." });
      case "LIMIT_FILE_COUNT":
        return res.status(400).json({ error: "Too many files uploaded." });
      case "LIMIT_UNEXPECTED_FILE":
        return res
          .status(400)
          .json({ error: "Unexpected file type or too many files." });
      default:
        return res.status(400).json({ error: `Multer error: ${err.message}` });
    }
  }

  // Handle other errors
  console.error(err.stack);
  res.status(500).json({ error: "An internal server error occurred." });
};
