import mongoose from "mongoose";
import { addSaleValidationSchema } from "../../validations/validationSchema.js";
import { Sale } from "../../models/saleModel.js";

export const updateTransaction = async (args, req) => {
  const { saleId, saleInfo } = args;
  const { companyId } = req;

  // validate saleId
  if (!mongoose.Types.ObjectId.isValid(saleId)) {
    throw new Error("Invalid sale ID.");
  }

  // validate saleId
  const { error, value } = addSaleValidationSchema.validate(saleInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  //   update the sale document
  const sale = await Sale.findOneAndUpdate(
    { _id: saleId, company: companyId },
    { ...saleInfo },
    { new: true }
  );

  if (!sale) {
    throw new Error("Error updating sale. Please try again");
  }

  // return sale
  return Sale.findById(sale._id).populate("company").populate("product");
};
