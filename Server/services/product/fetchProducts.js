import { Product } from "../../models/productModel.js";

export const fetchProducts = async (args, req) => {
  const { companyId } = req;

  // Create a filter
  const filter = {};

  // search by product name
  if (args?.searchTerm) {
    filter.name = { $regex: args.searchTerm, $options: "i" }; // Match `name`
  }

  // Search by product category
  if (args?.category) {
    filter.category = args.category; // Match `category`
  }

  // Search by product type
  if (args?.type) {
    filter.type = args.type;
  }

  // Attach company Id
  filter.company = companyId;

  const products = await Product.find(filter)
    .populate("company")
    .skip(args?.offset)
    .limit(args?.limit)
    .sort({ createdAt: -1 });

  return products;
};
