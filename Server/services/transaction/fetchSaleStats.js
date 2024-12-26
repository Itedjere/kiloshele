import mongoose from "mongoose";
import { Sale } from "../../models/saleModel.js";

export const fetchSaleStats = async (req) => {
  const { companyId } = req;
  const company = new mongoose.Types.ObjectId(companyId);

  // Get the start of today and the start of the current month
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const startOfMonth = new Date(
    startOfToday.getFullYear(),
    startOfToday.getMonth(),
    1
  );

  const stats = await Sale.aggregate([
    { $match: { company } }, // Match company-specific sales
    {
      $facet: {
        // Total Sales Count
        totalSalesToday: [
          { $match: { date: { $gte: startOfToday } } },
          { $count: "count" },
        ],
        totalSalesThisMonth: [
          { $match: { date: { $gte: startOfMonth } } },
          { $count: "count" },
        ],

        // Total Revenue
        totalRevenueToday: [
          { $match: { date: { $gte: startOfToday } } },
          { $unwind: "$itemSold" },
          {
            $group: {
              _id: null,
              revenue: {
                $sum: {
                  $multiply: ["$itemSold.quantity", "$itemSold.selling_price"],
                },
              },
            },
          },
        ],
        totalRevenueThisMonth: [
          { $match: { date: { $gte: startOfMonth } } },
          { $unwind: "$itemSold" },
          {
            $group: {
              _id: null,
              revenue: {
                $sum: {
                  $multiply: ["$itemSold.quantity", "$itemSold.selling_price"],
                },
              },
            },
          },
        ],

        // Total Profit
        totalProfitToday: [
          { $match: { date: { $gte: startOfToday } } },
          { $unwind: "$itemSold" },
          {
            $group: {
              _id: null,
              profit: {
                $sum: {
                  $multiply: [
                    "$itemSold.quantity",
                    {
                      $subtract: [
                        "$itemSold.selling_price",
                        "$itemSold.cost_price",
                      ],
                    },
                  ],
                },
              },
            },
          },
        ],
        totalProfitThisMonth: [
          { $match: { date: { $gte: startOfMonth } } },
          { $unwind: "$itemSold" },
          {
            $group: {
              _id: null,
              profit: {
                $sum: {
                  $multiply: [
                    "$itemSold.quantity",
                    {
                      $subtract: [
                        "$itemSold.selling_price",
                        "$itemSold.cost_price",
                      ],
                    },
                  ],
                },
              },
            },
          },
        ],

        // Add $lookup to join with Product collection
        topSellingProducts: [
          { $unwind: "$itemSold" },
          { $match: { date: { $gte: startOfMonth } } },
          {
            $group: {
              _id: "$itemSold.product",
              totalQuantity: { $sum: "$itemSold.quantity" },
            },
          },
          { $sort: { totalQuantity: -1 } },
          { $limit: 1 },
          {
            $lookup: {
              from: "products", // The collection name for your Product model
              localField: "_id",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 0,
              totalQuantity: 1,
              productName: { $arrayElemAt: ["$productDetails.name", 0] }, // Extract the name from the joined array
            },
          },
        ],

        lowSellingProducts: [
          { $unwind: "$itemSold" },
          { $match: { date: { $gte: startOfMonth } } },
          {
            $group: {
              _id: "$itemSold.product",
              totalQuantity: { $sum: "$itemSold.quantity" },
            },
          },
          { $sort: { totalQuantity: 1 } },
          { $limit: 1 },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 0,
              totalQuantity: 1,
              productName: { $arrayElemAt: ["$productDetails.name", 0] },
            },
          },
        ],

        mostProfitableProducts: [
          { $unwind: "$itemSold" },
          { $match: { date: { $gte: startOfMonth } } },
          {
            $group: {
              _id: "$itemSold.product",
              totalProfit: {
                $sum: {
                  $multiply: [
                    "$itemSold.quantity",
                    {
                      $subtract: [
                        "$itemSold.selling_price",
                        "$itemSold.cost_price",
                      ],
                    },
                  ],
                },
              },
            },
          },
          { $sort: { totalProfit: -1 } },
          { $limit: 1 },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "productDetails",
            },
          },
          {
            $project: {
              _id: 0,
              totalProfit: 1,
              productName: { $arrayElemAt: ["$productDetails.name", 0] },
            },
          },
        ],
      },
    },
    {
      $project: {
        totalSalesToday: { $arrayElemAt: ["$totalSalesToday.count", 0] },
        totalSalesThisMonth: {
          $arrayElemAt: ["$totalSalesThisMonth.count", 0],
        },
        totalRevenueToday: { $arrayElemAt: ["$totalRevenueToday.revenue", 0] },
        totalRevenueThisMonth: {
          $arrayElemAt: ["$totalRevenueThisMonth.revenue", 0],
        },
        totalProfitToday: { $arrayElemAt: ["$totalProfitToday.profit", 0] },
        totalProfitThisMonth: {
          $arrayElemAt: ["$totalProfitThisMonth.profit", 0],
        },
        topSellingProducts: "$topSellingProducts",
        lowSellingProducts: "$lowSellingProducts",
        mostProfitableProducts: "$mostProfitableProducts",
      },
    },
  ]);

  return stats[0];
};
