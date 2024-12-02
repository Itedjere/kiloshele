import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sku: { type: String },
    type: { type: String, enum: ["PRODUCT", "SERVICE"], required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    restock_level: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    supplier_name: { type: String },
    supplier_phone: { type: String },
    tags: [{ type: String }],
    photos: [{ type: String }],
  },
  { timestamps: true }
);

// Compound Index Example
productSchema.index({ category: 1, price: 1 });

// Compound Index for sku
productSchema.index({ company: 1, sku: 1 }, { unique: true });

productSchema.index({ company: 1, createdAt: 1 }); // Company + date filter

// Full-text Index Example
productSchema.index({ name: "text", description: "text", tags: "text" });

export const Product = mongoose.model("Product", productSchema);
