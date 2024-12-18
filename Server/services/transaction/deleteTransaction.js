import mongoose from "mongoose";
import { Sale } from "../../models/saleModel.js";

export const deleteTransaction = async (args, req) => {
  const { saleId } = args;
  const { companyId } = req;

  // validate saleId
  if (!mongoose.Types.ObjectId.isValid(saleId)) {
    throw new Error("Invalid Sale ID.");
  }

  // check if sale exists
  const sale = await Sale.findOne({
    company: companyId,
    _id: saleId,
  });
  if (!sale) {
    throw new Error("This sale does not exist");
  }

  const saleDocument = await Sale.findOneAndDelete({
    company: companyId,
    _id: saleId,
  });

  if (!saleDocument) {
    throw new Error("An error occurred. Please try again");
  }

  return saleDocument;
};
