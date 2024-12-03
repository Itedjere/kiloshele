import { Product } from "../../models/productModel.js";

export const fetchProducts = async (req) => {
  const { companyId } = req;

  const products = await Product.find({ company: companyId })
    .populate("company")
    .sort({ createdAt: -1 });

  return products;
};
