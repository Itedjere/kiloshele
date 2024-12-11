import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";
import * as Yup from "yup";

export const passwordSchema = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

export const registerSchema = Yup.object({
  name: Yup.string().required().min(3),
  username: Yup.string().required().min(3),
  password: passwordSchema,
  email: Yup.string().email(),
}).required();

export const loginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
}).required();

export const handleApolloErrors = (error: ApolloError) => {
  if (error.graphQLErrors?.length > 0) {
    error.graphQLErrors.forEach(({ message }) => toast.error(message));
  } else if (error.networkError) {
    toast.error("Network error occurred. Please try again.");
  } else {
    toast.error("An unexpected error occurred.");
  }
};
