import { Sale } from "../../models/saleModel.js";
import { addSaleValidationSchema } from "../../validations/validationSchema.js";

export const addTransaction = async (args, req) => {
  const { saleInfo } = args;
  const { companyId } = req;

  // Validate loginInfo
  const { error, value } = addSaleValidationSchema.validate(saleInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  // insert validation
  const sale = new Sale({ ...saleInfo, company: companyId });
  await sale.save();

  // return validation
  return Sale.findById(sale._id);
};
