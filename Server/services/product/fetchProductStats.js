import mongoose from "mongoose";
import { Product } from "../../models/productModel.js";

export const fetchProductStats = async (req) => {
  const { companyId } = req;
  const company = new mongoose.Types.ObjectId(companyId);

  const stats = await Product.aggregate([
    {
      $facet: {
        // Product statistics
        productStats: [
          { $match: { company, type: "PRODUCT" } },
          {
            $group: {
              _id: null,
              totalProducts: { $sum: 1 },
              totalInventoryValue: {
                $sum: { $multiply: ["$quantity", "$cost_price"] },
              },
              totalLowStock: {
                $sum: {
                  $cond: [{ $lte: ["$quantity", "$restock_level"] }, 1, 0],
                },
              },
              totalOutOfStock: {
                $sum: { $cond: [{ $eq: ["$quantity", 0] }, 1, 0] },
              },
            },
          },
        ],
        // Service statistics
        serviceStats: [
          { $match: { company, type: "SERVICE" } },
          {
            $group: {
              _id: null,
              totalServices: { $sum: 1 },
              averageServicePrice: { $avg: "$selling_price" },
              servicesWithAdditionalFees: {
                $sum: {
                  $cond: [{ $gt: [{ $size: "$other_fees" }, 0] }, 1, 0],
                },
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        productStats: {
          $arrayElemAt: ["$productStats", 0],
        },
        serviceStats: {
          totalServices: { $arrayElemAt: ["$serviceStats.totalServices", 0] },
          averageServicePrice: {
            $arrayElemAt: ["$serviceStats.averageServicePrice", 0],
          },
          servicesWithAdditionalFees: {
            $arrayElemAt: ["$serviceStats.servicesWithAdditionalFees", 0],
          },
        },
      },
    },
  ]);

  // Extract and format the data
  const { productStats, serviceStats } = stats[0] || [];

  return {
    productStats: {
      totalProducts: productStats?.totalProducts || 0,
      totalInventoryValue: productStats?.totalInventoryValue || 0,
      totalLowStock: productStats?.totalLowStock || 0,
      totalOutOfStock: productStats?.totalOutOfStock || 0,
    },
    serviceStats: {
      totalServices: serviceStats[0].totalServices || 0,
      averageServicePrice: serviceStats[0].averageServicePrice || 0,
      servicesWithAdditionalFees:
        serviceStats[0].servicesWithAdditionalFees || 0,
      mostExpensiveService: serviceStats[0].mostExpensiveService || 0,
    },
  };
};
