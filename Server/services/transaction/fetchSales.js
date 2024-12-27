import { Sale } from "../../models/saleModel.js";

export const fetchSales = async (req, args) => {
  const { companyId } = req;

  // Create a filter
  const filter = {};

  // Search products less than returned cursor
  if (args?.cursor) {
    filter.createdAt = { $lt: args.cursor }; // Use the cursor to fetch posts before the given post ID
  }

  // Attach company Id
  filter.company = companyId;

  const sales = await Sale.find(filter)
    .limit(10)
    .sort({ createdAt: -1 })
    .populate("company")
    .populate("itemSold.product", "_id name category type");

  const nextCursor =
    sales.length > 0 ? sales[sales.length - 1].createdAt : null;

  return { list: sales, nextCursor };
};
