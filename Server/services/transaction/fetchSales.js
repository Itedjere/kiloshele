import { log } from "node:console";
import { Sale } from "../../models/saleModel.js";

export const fetchSales = async (req, args) => {
  const { companyId } = req;
  const {
    limit,
    cursor,
    startDate,
    endDate,
    paymentStatus,
    staffAssigned,
    minimumAmount,
    maximumAmount,
    paymentMethod,
  } = args?.filters || { filters: {} };

  // Create a filter
  const filter = {};

  // Filter by date range
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  // Filter by payment status
  if (paymentStatus) {
    filter.payment_status = paymentStatus.toUpperCase();
  }

  // Filter by payment method
  if (paymentMethod) {
    filter.payment_method = paymentMethod.toUpperCase();
  }

  // Filter by staff assigned
  if (staffAssigned) {
    filter.staff_assigned = staffAssigned;
  }

  // Filter by sales amount range
  if (minimumAmount || maximumAmount) {
    filter["itemSold.selling_price"] = {};
    if (minimumAmount)
      filter["itemSold.selling_price"].$gte = parseFloat(minimumAmount);
    if (maximumAmount)
      filter["itemSold.selling_price"].$lte = parseFloat(maximumAmount);
  }

  // Attach company Id
  filter.company = companyId;

  // Fetch the total count of matching documents
  const totalResults = await Sale.countDocuments(filter);

  // Search products less than returned cursor
  if (cursor) {
    filter.createdAt = { $lt: cursor }; // Use the cursor to fetch posts before the given post ID
  }

  const sales = await Sale.find(filter)
    .limit(limit)
    .sort({ createdAt: -1 })
    .populate("company")
    .populate("itemSold.product", "_id name category type quantity");

  const nextCursor =
    sales.length > 0 ? sales[sales.length - 1].createdAt : null;

  return { list: sales, nextCursor, totalResults };
};
