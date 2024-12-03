import { Product } from "../../models/productModel.js";
import { addProductValidationSchema } from "../../validations/validationSchema.js";

export const createProduct = async (args, req) => {
  const { productInfo } = args;
  const { companyId } = req;

  // Validate productInfo
  const { error, value } = addProductValidationSchema.validate(productInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  //   Check if this product already exists
  const productAlreadyExists = await Product.exists({
    company: companyId,
    name: productInfo.name,
    category: productInfo.category,
  });

  if (productAlreadyExists) {
    throw new Error("Another product with this name exists in this category");
  }

  //   Insert product and return
  const product = new Product({ ...productInfo, company: companyId });
  await product.save();

  if (!product) {
    throw new Error("Failed to add product. Please try again");
  }

  return product.populate("company");
};
