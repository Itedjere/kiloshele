import mongoose from "mongoose";

const companySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const Company = mongoose.model("User", companySchema);
