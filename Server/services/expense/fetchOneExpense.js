import mongoose from "mongoose";
import { Expense } from "../../models/expenseModel.js";

export const fetchOneExpense = async (req, args) => {
  const { expenseId } = args;
  const { companyId } = req;

  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    throw new Error("Invalid expense ID.");
  }

  // Retrieve the expense document and populate the 'company' field
  const expense = await Expense.findOne({
    _id: expenseId,
    company: companyId,
  }).populate("company");

  if (!expense) {
    throw new Error("Error, expense does not exist");
  }

  return expense;
};
