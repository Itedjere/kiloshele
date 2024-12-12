import { Expense } from "../../models/expenseModel.js";
import { addExpenseValidationSchema } from "../../validations/validationSchema.js";

export const addExpense = async (args, req) => {
  const { expenseInfo } = args;
  const { companyId } = req;

  // Validate loginInfo
  console.log(expenseInfo);

  const { error, value } = addExpenseValidationSchema.validate(expenseInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  // insert validation
  const expense = new Expense({ ...expenseInfo, company: companyId });
  await expense.save();

  // return validation
  return Expense.findById(expense._id).populate("company");
};
