import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { Company } from "../../models/companyModel.js";
import { companySignupValidationSchema } from "../../validations/validationSchema.js";

export const signupCompany = async (signupInfo) => {
  // Validate the Comapny details
  const { error, value } = companySignupValidationSchema.validate(signupInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  // Check if Comapny already exists
  const existingCompany = await Company.findOne({ name: signupInfo.name });
  if (existingCompany) {
    throw new Error("A Company with this name already exists.");
  }

  // Hash password
  const bcryptSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(signupInfo.password, bcryptSalt);

  // Save company details
  const company = new Company({ ...signupInfo, password: hashedPassword });
  await company.save();

  if (!company) {
    throw new Error("Failed to sign you up. Please try again.");
  }

  // Generate token
  const jwtPrivateKey = process.env.JWTPRIVATEKEY;
  if (!jwtPrivateKey) {
    throw new Error("JWT Private Key is missing in environment variables.");
  }

  const token = jwt.sign({ companyId: company._id }, jwtPrivateKey, {
    expiresIn: "7d",
  });

  // Return the new user and token
  return { company, token };
};
