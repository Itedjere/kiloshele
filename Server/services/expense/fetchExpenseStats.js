import mongoose from "mongoose";
import { Expense } from "../../models/expenseModel.js";

export const fetchExpenseStats = async (req) => {
  const { companyId } = req;

  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();

  const startOfMonth = new Date(thisYear, thisMonth, 1);
  const endOfMonth = new Date(thisYear, thisMonth + 1, 0, 23, 59, 59, 999);

  const startOfYear = new Date(thisYear, 0, 1);
  const endOfYear = new Date(thisYear, 11, 31, 23, 59, 59, 999);

  const lastYear = thisYear - 1;

  const startOfLastYear = new Date(lastYear, 0, 1);
  const endOfLastYear = new Date(lastYear, 11, 31, 23, 59, 59, 999);

  // Aggregate statistics
  const stats = await Promise.all([
    // Total expenses for today
    Expense.aggregate([
      {
        $match: {
          company: new mongoose.Types.ObjectId(companyId),
          date: { $gte: startOfDay, $lte: endOfDay },
        },
      },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]),
    // Total expenses for this month
    Expense.aggregate([
      {
        $match: {
          company: new mongoose.Types.ObjectId(companyId),
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]),
    // Total expenses for this year
    Expense.aggregate([
      {
        $match: {
          company: new mongoose.Types.ObjectId(companyId),
          date: { $gte: startOfYear, $lte: endOfYear },
        },
      },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]),
    // Total expenses for this last year
    Expense.aggregate([
      {
        $match: {
          company: new mongoose.Types.ObjectId(companyId),
          date: { $gte: startOfLastYear, $lte: endOfLastYear },
        },
      },
      {
        $group: { _id: null, totalAmount: { $sum: "$amount" } },
      },
    ]),
    // Category with the highest expenses for this month
    Expense.aggregate([
      {
        $match: {
          company: new mongoose.Types.ObjectId(companyId),
          date: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: "$category",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $sort: { totalAmount: -1 },
      },
      { $limit: 1 },
    ]),
  ]);

  console.log(stats);

  return {
    todayExpenses: stats[0]?.[0]?.totalAmount || 0,
    monthExpenses: stats[1]?.[0]?.totalAmount || 0,
    yearExpenses: stats[2]?.[0]?.totalAmount || 0,
    lastYearExpenses: stats[3]?.[0]?.totalAmount || 0,
    highestExpenseCategory: stats[4]?.[0]?._id || null,
    highestExpenseAmount: stats[4]?.[0]?.totalAmount || 0,
  };
};
