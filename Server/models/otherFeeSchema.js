import mongoose from "mongoose";

export const otherFeeSchema = new mongoose.Schema(
  {
    duration: { type: String, required: true }, // e.g., "1 month", "2 weeks", etc.
    cost_price: { type: Number, required: true, min: 0 }, // Cost Price associated with the duration
    selling_price: { type: Number, required: true, min: 0 }, // Fee associated with the duration
  },
  { _id: false } // Prevents the creation of an additional `_id` for subdocuments
);
