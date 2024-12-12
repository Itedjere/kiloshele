import { Product } from "../../models/productModel.js";

export const fetchProductsCategories = async (req) => {
  const { companyId } = req;

  const productsCategories = await Product.distinct("category", {
    company: companyId,
  }).sort({
    createdAt: -1,
  });

  return productsCategories;
};
