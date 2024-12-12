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

export const priceSchema = Yup.number()
  .typeError("Price must be a number")
  .positive("Price must be greater than zero")
  .required("Price is required")
  .test("is-decimal", "Price must have at most two decimal places", (value) =>
    value ? /^\d+(\.\d{1,2})?$/.test(value.toString()) : true
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

export const addExpenseSchema = Yup.object({
  title: Yup.string().required().min(3),
  amount: priceSchema,
  date: Yup.string()
    .required("Date is required")
    .test("is-valid-date", "Invalid date", (value) => {
      return !isNaN(new Date(value || "").getTime());
    }),
  payment_method: Yup.string()
    .oneOf(
      ["CARD", "CASH", "BANK_TRANSFER"],
      "Please select a valid payment method"
    )
    .required("Payment Method is required"),
  payment_status: Yup.string()
    .oneOf(
      ["PAID", "PENDING", "PARTIALLY_PAID"],
      "Please select a valid payment status"
    )
    .required("Payment Status is required"),
  additional_notes: Yup.string().optional(),
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
