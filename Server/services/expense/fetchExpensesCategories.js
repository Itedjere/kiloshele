import { Expense } from "../../models/expenseModel.js";

export const fetchExpensesCategories = async (req) => {
  const { companyId } = req;

  const expensesCategories = await Expense.distinct("category", {
    company: companyId,
  }).sort({
    createdAt: -1,
  });

  return expensesCategories;
};
