import mongoose from "mongoose";
import { fileDeletion } from "../../utilities/fileDeletion.js";
import { Product } from "../../models/productModel.js";
import { Expense } from "../../models/expenseModel.js";

export const deleteFile = async (req, args) => {
  const { resourceId, fileUrl, resourceType } = args;

  // validate the resourceId
  if (!mongoose.Types.ObjectId.isValid(resourceId)) {
    throw new Error("Invalid resource ID.");
  }

  // find the resource
  let Resource = null;
  switch (resourceType) {
    case "Product":
      Resource = Product;
      break;
    case "Expense":
      Resource = Expense;
    default:
      break;
  }

  if (!Resource) {
    throw new Error(`${resourceType} does not exist`);
  }

  const resource = await Resource.findById(resourceId);

  if (!resource) {
    throw new Error(`${resourceType} does not exist`);
  }

  // filter the file name from the list
  const newMediaUrlArray = resource.mediaUrl.filter(
    (photoUrl) => photoUrl !== fileUrl
  );

  // update the resource
  const result = await Resource.findOneAndUpdate(
    { _id: resourceId },
    { mediaUrl: newMediaUrlArray },
    { returnDocument: "after" }
  );

  if (!result) {
    // return success message
    throw new Error("No photo was deleted");
  }

  // Delete the file from the upload folder
  fileDeletion(fileUrl);
  return result.populate("company");
};
