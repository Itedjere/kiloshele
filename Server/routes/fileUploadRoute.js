import express from "express";
const fileUploadRouter = express.Router();

import { fileUploadController } from "../controllers/FileUploads/fileUploadController.js";
import {
  expensesUpload,
  productsUpload,
} from "../multer/fileUploadConfiguration.js";

fileUploadRouter.post(
  "/expensesfiles",
  expensesUpload.array("files", 3),
  fileUploadController
);

fileUploadRouter.post(
  "/productfiles",
  productsUpload.array("files", 3),
  fileUploadController
);

export default fileUploadRouter;
