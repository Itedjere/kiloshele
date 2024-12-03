import { Product } from "../../models/productModel.js";
import { addProductValidationSchema } from "../../validations/validationSchema.js";

export const editProduct = async (args, req) => {
  const { productId, productInfo } = args;
  const { companyId } = req;

  // validate productInfo
  const { error, value } = addProductValidationSchema.validate(productInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  //   update the product document
  const product = await Product.findOneAndUpdate(
    { _id: productId, company: companyId },
    { ...productInfo },
    { new: true }
  );

  if (!product) {
    throw new Error("Error updating product. Please try again");
  }

  // return product
  return product.populate("company");
};
