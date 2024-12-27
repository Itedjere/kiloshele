import mongoose from "mongoose";
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

  // Search products less than returned cursor
  if (args?.cursor) {
    filter.createdAt = { $lt: args.cursor }; // Use the cursor to fetch posts before the given post ID
  }

  // Attach company Id
  filter.company = companyId;

  const products = await Product.find(filter)
    .limit(10)
    .sort({ createdAt: -1 })
    .populate("company");

  const nextCursor =
    products.length > 0 ? products[products.length - 1].createdAt : null;

  return { list: products, nextCursor };
};
