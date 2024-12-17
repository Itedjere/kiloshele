import mongoose from "mongoose";
import { Product } from "../../models/productModel.js";

export const fetchOneProduct = async (req, args) => {
  const { productId } = args;
  const { companyId } = req;

  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID.");
  }

  // Retrieve the product document and populate the 'company' field
  const product = await Product.findOne({
    _id: productId,
    company: companyId,
  }).populate("company");

  if (!product) {
    throw new Error("Error, Product does not exist");
  }

  return product;
};
