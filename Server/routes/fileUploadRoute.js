import express from "express";
const fileUploadRouter = express.Router();

import { expensesFileUploadController } from "../controllers/FileUploads/expensesFileUploadController.js";
import { expensesUpload } from "../multer/fileUploadConfiguration.js";

fileUploadRouter.post(
  "/expensesfiles",
  expensesUpload.array("files", 3),
  expensesFileUploadController
);

export default fileUploadRouter;
