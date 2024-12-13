import { Product } from "../../models/productModel.js";

export const fetchProducts = async (args, req) => {
  const { companyId } = req;

  const { productFilter } = args;

  // Create a filter
  const filter = {};

  // search by product name
  if (productFilter?.searchTerm) {
    filter.name = { $regex: productFilter.searchTerm, $options: "i" }; // Match `name`
  }

  // Search by product category
  if (productFilter?.category) {
    filter.category = productFilter.category; // Match `category`
  }

  // Search by product type
  if (productFilter?.type) {
    filter.type = productFilter.type;
  }

  // Attach company Id
  filter.company = companyId;

  const products = await Product.find(filter)
    .populate("company")
    .skip(productFilter?.offset)
    .limit(productFilter?.limit)
    .sort({ createdAt: -1 });

  return products;
};
