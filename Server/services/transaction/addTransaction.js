import { Sale } from "../../models/saleModel.js";
import { Product } from "../../models/productModel.js";
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

  // Update the quantity of each product within the sales
  saleInfo.itemSold.forEach(async (item) => {
    // find the product
    const product = await Product.findById(item.product);

    if (product && product.type === "PRODUCT") {
      // if found update the quantity
      await Product.updateOne(
        { _id: product._id },
        { quantity: product.quantity - item.quantity }
      );
    }
  });

  // return validation
  return Sale.findById(sale._id)
    .populate("company")
    .populate("itemSold.product", "_id name category type quantity");
};
