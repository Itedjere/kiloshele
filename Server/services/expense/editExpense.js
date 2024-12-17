import mongoose from "mongoose";
import { Expense } from "../../models/expenseModel.js";
import { fileDeletion } from "../../utilities/fileDeletion.js";
import { addExpenseValidationSchema } from "../../validations/validationSchema.js";

export const editExpense = async (args, req) => {
  const { expenseId, expenseInfo } = args;
  const { companyId } = req;

  // validate productId
  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    throw new Error("Invalid expense ID.");
  }

  // validate expenseInfo
  const { error, value } = addExpenseValidationSchema.validate(expenseInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  // first find the expense
  const oldExpense = await Expense.findOne({
    _id: expenseId,
    company: companyId,
  });

  if (!oldExpense) {
    throw new Error("This Expense does not exist.");
  }

  //   update the expense document
  const updatedExpense = await Expense.findOneAndReplace(
    { _id: expenseId, company: companyId },
    { ...expenseInfo, company: companyId },
    { returnDocument: "after" }
  );

  if (!updatedExpense) {
    throw new Error("Error updating expense. Please try again");
  }

  // Delete old pictures
  // retrieve the old mediaUrl
  const mediaUrl = oldExpense.mediaUrl;
  if (mediaUrl.length > 0) {
    mediaUrl.forEach((url) => fileDeletion(url));
  }

  // return expense
  return updatedExpense.populate("company");
};
