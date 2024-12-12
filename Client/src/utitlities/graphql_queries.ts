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
