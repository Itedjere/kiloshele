import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    payment_method: {
      type: String,
      enum: ["CARD", "CASH", "BANK_TRANSFER"],
      required: true,
    },
    payment_status: {
      type: String,
      enum: ["PAID", "PENDING", "PARTIALLY_PAID"],
      required: true,
    },
    mediaUrl: [
      {
        type: String,
      },
    ],
    additional_notes: { type: String },
  },
  { timestamps: true }
);

expenseSchema.index({ company: 1, createdAt: 1 }); // Company + date filter
expenseSchema.index({ company: 1, category: 1 }); // Company + category filter
expenseSchema.index({ company: 1, payment_method: 1 }); // Company + payment method filter
expenseSchema.index({ company: 1, payment_status: 1 }); // Company + payment status filter
expenseSchema.index({ company: 1, category: 1, createdAt: 1 }); // Compound filter
expenseSchema.index({ company: 1, title: 1 }); // Search by title (optional)

export const Expense = mongoose.model("Expense", expenseSchema);
