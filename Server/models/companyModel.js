import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

companySchema.index({ name: 1 }); // Company + date filter

export const Company = mongoose.model("Company", companySchema);
