import { gql } from "../__generated__/gql";

export const GET_EXPENSES_CATEGORIES = gql(/* GraphQL */ `
  query ExpensesCategories {
    expensesCategories
  }
`);

export const GET_PRODUCTS_CATEGORIES = gql(/* GraphQL */ `
  query ProductCategories {
    productsCategories
  }
`);

export const GET_PRODUCTS = gql(/* GraphQL */ `
  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {
    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {
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
  }
`);

export const GET_EXPENSES = gql(/* GraphQL */ `
  query Expenses {
    expenses {
      ...ExpenseFields
    }
  }
`);
