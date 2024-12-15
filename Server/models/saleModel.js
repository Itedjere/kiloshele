import mongoose from "mongoose";

const itemSoldSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, min: 1, required: true },
  cost_price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
});

const saleSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    itemSold: [itemSoldSchema],
    customer_name: { type: String },
    customer_phone: { type: String },
    customer_note: { type: String },
    staff_assigned: { type: String },
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
    additional_note: { type: String },
  },
  { timestamps: true }
);

saleSchema.index({ company: 1, createdAt: 1 }); // Company + date filter
saleSchema.index({ company: 1, payment_status: 1 }); // Company + payment status filter
saleSchema.index({ company: 1, payment_method: 1 }); // Company + payment method filter
saleSchema.index({ company: 1, product: 1 }); // Company + product filter
saleSchema.index({ company: 1, payment_status: 1, createdAt: 1 }); // Compound filter

export const Sale = mongoose.model("Sale", saleSchema);
