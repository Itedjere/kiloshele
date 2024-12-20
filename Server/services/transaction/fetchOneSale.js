import mongoose from "mongoose";
import { Sale } from "../../models/saleModel.js";

export const fetchOneSale = async (req, args) => {
  const { saleId } = args;
  const { companyId } = req;

  // Check if the id is valid
  if (!mongoose.Types.ObjectId.isValid(saleId)) {
    throw new Error("Invalid Sale ID.");
  }

  // Retrieve the product document and populate the 'company' field
  const sale = await Sale.findOne({
    _id: saleId,
    company: companyId,
  })
    .populate("company")
    .populate("itemSold.product", "_id name category type");

  if (!sale) {
    throw new Error("Error, Sale does not exist");
  }

  return sale;
};
