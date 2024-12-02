import { Expense } from "../../models/expenseModel.js";

export const fetchExpenses = async (req) => {
  const { companyId } = req;

  const expenses = await Expense.find({ company: companyId })
    .populate("company")
    .sort({ createdAt: -1 });

  return expenses;
};
