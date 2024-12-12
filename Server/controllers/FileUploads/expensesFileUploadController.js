export const expensesFileUploadController = (req, res, next) => {
  try {
    if (!req.isAuth) {
      throw new Error("User is not authenticated");
    }
    if (!req.files) {
      throw new Error("File upload failed.");
    }

    const fileUrls = req.files.map((file) => `/uploads/${file.filename}`);
    res.json({ success: true, fileUrls });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
