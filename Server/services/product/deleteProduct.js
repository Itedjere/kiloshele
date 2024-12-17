import mongoose from "mongoose";
import { Product } from "../../models/productModel.js";
import { fileDeletion } from "../../utilities/fileDeletion.js";

export const deleteProduct = async (args, req) => {
  const { productId } = args;
  const { companyId } = req;

  // validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID.");
  }

  // check if product exists
  const product = await Product.findOne({
    company: companyId,
    _id: productId,
  });
  if (!product) {
    throw new Error("This product does not exist");
  }

  const productDocument = await Product.findOneAndDelete({
    company: companyId,
    _id: productId,
  });

  if (!productDocument) {
    throw new Error("An error occurred. Please try again");
  }

  // Delete files if any
  if (productDocument.photos.length > 0) {
    productDocument.photos.forEach((url) => fileDeletion(url));
  }

  return productDocument.populate("company");
};
