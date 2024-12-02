import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginCompanyValidationSchema } from "../../validations/validationSchema.js";
import { Company } from "../../models/companyModel.js";

export const loginCompany = async (loginInfo) => {
  // Validate loginInfo
  const { error, value } = loginCompanyValidationSchema.validate(loginInfo);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  // Find user by username
  const company = await Company.findOne({ username: loginInfo.username });

  // Return error if user is not found
  if (!company) {
    throw new Error("Incorrect login details");
  }

  // Check if password is valid
  const validPassword = await bcrypt.compare(
    loginInfo.password,
    company.password
  );
  if (!validPassword) {
    throw new Error("Incorrect login details");
  }

  // Generate token
  const jwtPrivateKey = process.env.JWTPRIVATEKEY;
  if (!jwtPrivateKey) {
    throw new Error("JWT Private Key is missing in environment variables.");
  }

  const token = jwt.sign({ companyId: company._id }, jwtPrivateKey, {
    expiresIn: "7d",
  });

  // Return the user and token
  return { company, token };
};
