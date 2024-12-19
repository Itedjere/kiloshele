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
      ...ProductFields
    }
  }
`);

export const GET_ONE_PRODUCT = gql(`
  query FetchProduct($productId: String!) {
    productOne(productId: $productId) {
        ...ProductFields
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

export const GET_ONE_EXPENSE = gql(`
  query FetchExpense($expenseId: String!) {
    expenseOne(expenseId: $expenseId) {
        ...ExpenseFields
    }
}
`);

export const GET_SALES = gql(`
  query Sales {
    sales {
      ...SaleFields
    }
  }  
`);

export const GET_ONE_SALE = gql(`
  query FetchSale($saleId: String!) {
    saleOne(saleId: $saleId) {
        ...SaleFields
    }
  }
`);
