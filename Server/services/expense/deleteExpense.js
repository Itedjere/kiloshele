import mongoose from "mongoose";
import { Expense } from "../../models/expenseModel.js";

export const deleteExpense = async (args, req) => {
  const { expenseId } = args;
  const { companyId } = req;

  // validate expenseId
  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    throw new Error("Invalid expense ID.");
  }

  // check if friend exists
  const expense = await Expense.findOne({ company: companyId, _id: expenseId });
  if (!expense) {
    throw new Error("This Expense does not exist");
  }

  const expenseDocument = await Expense.findOneAndDelete({
    company: companyId,
    _id: expenseId,
  });

  if (!expenseDocument) {
    throw new Error("An error occurred. Please try again");
  }

  return expenseDocument.populate("company");
};
