import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { AxiosError } from "axios";

interface MulterErrorResponse {
  error: string;
}

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

export const addProductSchema = Yup.object({
  name: Yup.string().required().min(3),
  sku: Yup.string().optional(),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than zero")
    .required("Quantity is required"),
  restock_level: Yup.number()
    .typeError("Restock level must be a number")
    .positive("Restock level must be greater than zero")
    .min(1)
    .optional(),
  cost_price: priceSchema,
  selling_price: priceSchema,
  description: Yup.string().optional(),
  supplier_name: Yup.string().optional(),
  supplier_phone: Yup.string().optional(),
  tags: Yup.string().optional(),
}).required();

export const otherServiceFeeSchema = Yup.object({
  duration: Yup.string().required("Duration is required"),
  cost_price: priceSchema,
  selling_price: priceSchema,
}).required();

export const addSaleSchema = Yup.object({
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
  staff_assigned: Yup.string().optional(),
  customer_name: Yup.string().optional(),
  customer_phone: Yup.string().optional(),
  customer_reference: Yup.string().optional(),
  additional_note: Yup.string().optional(),
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

export const handleAxiosFileUploadErrors = (error: AxiosError) => {
  const axiosError = error as AxiosError<MulterErrorResponse>;

  // Handle Multer errors
  if (axiosError.response?.data.error) {
    toast.error(axiosError.response.data.error);
  } else {
    toast.error("An unexpected error occurred. Please try again.");
  }
};

export const formatPrice = (
  amount: number,
  currency: string = "NGN",
  locale: string = "en-NG"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export function generateRandomString(length: number): string {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

export const getFileType = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();
  if (["png", "jpg", "jpeg", "gif"].includes(extension!)) return "image";
  if (extension === "pdf") return "pdf";
  if (["xls", "xlsx"].includes(extension!)) return "excel";
  return "unknown";
};

/**
 * Truncate a string to a specified length and append "..." if it exceeds the limit.
 * @param {string} str - The string to truncate.
 * @param {number} maxLength - The maximum length of the truncated string including the ellipsis.
 * @returns {string} - The truncated string.
 */
export const truncateString = (str: string, maxLength: number = 20): string => {
  if (str.length <= maxLength) {
    return str; // Return the original string if it's within the limit.
  }
  const truncatedLength = maxLength - 3; // Reserve space for "..."
  return str.slice(0, truncatedLength) + "...";
};

// You can type it the shorthand way
export const paymentMethodsUtils: { [key: string]: string }[] = [
  { CARD: "Card" },
  { CASH: "Cash" },
  { BANK_TRANSFER: "Bank Transfer" },
];

// Or the normal way Array<Type>
export const paymentStatusUtils: Array<{ [key: string]: string }> = [
  { PAID: "Paid" },
  { PENDING: "Pending" },
  { PARTIALLY_PAID: "Partially Paid" },
];
