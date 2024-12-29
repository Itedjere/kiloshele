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

  const sale = await Sale.findOneAndReplace(
    { _id: saleId, company: companyId },
    { ...saleInfo, company: companyId },
    { returnDocument: "after" }
  );

  if (!sale) {
    throw new Error("Error updating sale. Please try again");
  }

  // return sale
  return await Sale.findById(saleId)
    .populate("company")
    .populate("itemSold.product", "_id name category type quantity");
};
