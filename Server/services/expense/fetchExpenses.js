import { Expense } from "../../models/expenseModel.js";

export const fetchExpenses = async (req, args) => {
  const { companyId } = req;

  // Create a filter
  const filter = {};

  // Search products less than returned cursor
  if (args?.cursor) {
    filter.createdAt = { $lt: args.cursor }; // Use the cursor to fetch posts before the given post ID
  }

  // Attach company Id
  filter.company = companyId;

  const expenses = await Expense.find(filter)
    .limit(10)
    .sort({ createdAt: -1 })
    .populate("company");

  const nextCursor =
    expenses.length > 0 ? expenses[expenses.length - 1].createdAt : null;

  return { list: expenses, nextCursor };
};
