import mongoose from "mongoose";
import { Product } from "../../models/productModel.js";
import { addProductValidationSchema } from "../../validations/validationSchema.js";

export const editProduct = async (args, req) => {
  const { productId, productInfo } = args;
  const { companyId } = req;

  // validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID.");
  }

  // validate productInfo
  const { error, value } = addProductValidationSchema.validate(productInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  // first find the product
  const oldProduct = await Product.findOne({
    _id: productId,
    company: companyId,
  });

  if (!oldProduct) {
    throw new Error("This Product does not exist.");
  }

  //   update the product document
  const productUpdated = await Product.findOneAndReplace(
    { _id: productId, company: companyId },
    {
      ...productInfo,
      company: companyId,
      mediaUrl: [...oldProduct.mediaUrl, ...productInfo.mediaUrl],
    },
    { returnDocument: "after" }
  );

  if (!productUpdated) {
    throw new Error("Error updating product. Please try again");
  }

  // return product
  return productUpdated.populate("company");
};
