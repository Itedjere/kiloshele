import Joi from "joi";

export const companySignupValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
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
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  about_me: Joi.string().optional(),
});

export const loginCompanyValidationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
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
