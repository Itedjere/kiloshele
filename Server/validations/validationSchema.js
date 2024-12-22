import Joi from "joi";

const otherFeeSchema = Joi.array()
  .items({
    duration: Joi.string().min(3).required(),
    cost_price: Joi.number().positive().required(),
    selling_price: Joi.number().positive().required(),
  })
  .min(0);

export const companySignupValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().optional(),
  username: Joi.string().min(3).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$'
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, digit, and special character.[!@#$%^&*(),]",
    }),
});

export const loginCompanyValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const addExpenseValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  amount: Joi.number().positive().required(),
  category: Joi.string().required(),
  date: Joi.date().iso().required(),
  payment_method: Joi.string()
    .valid("CARD", "CASH", "BANK_TRANSFER")
    .required(),
  payment_status: Joi.string()
    .valid("PAID", "PENDING", "PARTIALLY_PAID")
    .required(),
  mediaUrl: Joi.array().items(Joi.string()).min(0),
  additional_notes: Joi.string().allow("").optional(), // Allow empty strings
});

export const addProductValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  sku: Joi.string().allow("").optional(),
  type: Joi.string().valid("PRODUCT", "SERVICE").required(),
  category: Joi.string().required(),
  quantity: Joi.number().positive().required(),
  restock_level: Joi.number().positive().optional(),
  cost_price: Joi.number().positive().required(),
  selling_price: Joi.number().positive().required(),
  other_fees: otherFeeSchema,
  description: Joi.string().allow("").optional(),
  supplier_name: Joi.string().allow("").optional(),
  supplier_phone: Joi.string().allow("").optional(),
  tags: Joi.array().items(Joi.string()).min(0),
  mediaUrl: Joi.array().items(Joi.string()).min(0),
});

export const addSaleValidationSchema = Joi.object({
  itemSold: Joi.array()
    .items({
      product: Joi.string().required(),
      quantity: Joi.number().positive().required(),
      cost_price: Joi.number().positive().required(),
      selling_price: Joi.number().positive().required(),
      other_fees: otherFeeSchema,
    })
    .min(1)
    .required(),
  date: Joi.date().iso().required(),
  customer_name: Joi.string().allow("").optional(),
  customer_phone: Joi.string().allow("").optional(),
  customer_reference: Joi.string().allow("").optional(),
  staff_assigned: Joi.string().allow("").optional(),
  payment_method: Joi.string()
    .valid("CARD", "CASH", "BANK_TRANSFER")
    .required(),
  payment_status: Joi.string()
    .valid("PAID", "PENDING", "PARTIALLY_PAID")
    .required(),
  additional_note: Joi.string().allow("").optional(), // Allow empty strings
});

export const profileEditBasicValidationSchema = Joi.object({
  firstname: Joi.string().min(3).required(),
  lastname: Joi.string().min(3).required(),
  phone: Joi.string()
    .pattern(new RegExp("^(\\+234|0)[789]\\d{9}$"))
    .required()
    .messages({
      "string.pattern.base": "Enter a valid phone number",
      "string.empty": "Phone number is required",
    }),
  gender: Joi.string().valid("MALE", "FEMALE").required(),
  country: Joi.string().required(),
  dob: Joi.date().optional(),
  city: Joi.string().allow("").optional(),
  state: Joi.string().allow("").optional(),
  about_me: Joi.string().allow("").optional(),
});

export const changePasswordValidationSchema = Joi.object({
  new_password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$'
      )
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain an uppercase letter, lowercase letter, digit, and special character [!@#$%^&*(),].",
      "string.empty": "New password is required.",
    }),

  confirm_password: Joi.any()
    .valid(Joi.ref("new_password"))
    .required()
    .messages({
      "any.only": "Confirm password does not match new password.",
    }),

  current_password: Joi.string().required().messages({
    "string.empty": "Current password is required.",
  }),
});

export const addPostValidationSchema = Joi.object({
  postType: Joi.string().valid("TEXT", "IMAGE", "VIDEO").required(),
  textContent: Joi.string().required(),
  mediaURL: Joi.string().allow("").required(),
});
