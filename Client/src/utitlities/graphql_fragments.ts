import { gql } from "../__generated__/gql";

export const EXPENSE_FRAGMENT = gql(`
  fragment ExpenseFields on Expense {
    _id
    title
    category
    date
    amount
    payment_method
    payment_status
    additional_notes
    mediaUrl
  }
`);

export const PRODUCT_FRAGMENT = gql(`
    fragment ProductFields on Product {
      _id
      name
      sku
      other_fees {
        cost_price
        duration
        selling_price
      }
      description
      supplier_name
      supplier_phone
      tags
      photos
      category
      createdAt
      cost_price
      selling_price
      quantity
      restock_level
      photos
      type
    }
`);
