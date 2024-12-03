import { Expense } from "../../models/expenseModel.js";
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

  //   update the expense document
  const expense = await Expense.findOneAndUpdate(
    { _id: expenseId, company: companyId },
    { ...expenseInfo },
    { new: true }
  );

  if (!expense) {
    throw new Error("Error updating expense. Please try again");
  }

  // return expense
  return expense.populate("company");
};
