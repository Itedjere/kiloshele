import { gql } from "../__generated__/gql";

export const AUTHENTICATION_FRAGMENT = gql(`
  fragment AuthenticationFields on AuthenticatedCompany {
    token
    company {
      _id
      name
      username
      email
    }
  }
`);

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
      category
      createdAt
      cost_price
      selling_price
      quantity
      restock_level
      mediaUrl
      type
    }
`);

export const SALE_FRAGMENT = gql(`
  fragment SaleFields on Sale {
    _id
    itemSold {
      product {
        _id
        name
        category
        type
        quantity
      }
      cost_price
      selling_price
      quantity
      _id
      other_fees {
        duration
        cost_price
        selling_price
      }
    }
    customer_name
    customer_phone
    customer_reference
    date
    payment_method
    payment_status
    staff_assigned
    additional_note
  }
`);
