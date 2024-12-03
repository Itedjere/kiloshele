import { Sale } from "../../models/saleModel.js";

export const fetchSales = async (req) => {
  const { companyId } = req;

  const sales = await Sale.find({ company: companyId })
    .populate("company")
    .populate("product")
    .sort({ createdAt: -1 });

  return sales;
};
