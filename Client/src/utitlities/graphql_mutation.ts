import { gql } from "../__generated__/gql";

export const SIGNUP_COMPANY = gql(/* GraphQL */ `
  mutation SignupCompany($signupInfo: ADDCOMPANYINPUT!) {
    signupCompany(signupInfo: $signupInfo) {
      ...AuthenticationFields
    }
  }
`);

export const LOGIN_COMPANY = gql(/* GraphQL */ `
  mutation LoginCompany($loginInfo: LOGINCOMPANYINPUT!) {
    loginCompany(loginInfo: $loginInfo) {
      ...AuthenticationFields
    }
  }
`);

export const ADD_EXPENSES = gql(/* GraphQL */ `
  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {
    addExpense(expenseInfo: $expenseInfo) {
      ...ExpenseFields
    }
  }
`);

export const UPDATE_EXPENSES = gql(`
  mutation UpdateExpense($expenseId: String!, $expenseInfo: ADDEXPENSEINPUT!) {
    updateExpense(expenseId: $expenseId, expenseInfo: $expenseInfo) {
      ...ExpenseFields
    }
  }
`);

export const DELETE_EXPENSES = gql(/* GraphQL */ `
  mutation DeleteExpense($expenseId: String!) {
    removeExpense(expenseId: $expenseId) {
      _id
    }
  }
`);

export const ADD_PRODUCTS = gql(/* GraphQL */ `
  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {
    addProduct(productInfo: $productInfo) {
      ...ProductFields
    }
  }
`);

export const UPDATE_PRODUCT = gql(`
  mutation UpdateProduct($productId: String!, $productInfo: ADDPRODUCTINPUT!) {
    updateProduct(productId: $productId, productInfo: $productInfo) {
      ...ProductFields
    }
  }
`);

export const DELETE_PRODUCT = gql(/* GraphQL */ `
  mutation DeleteProduct($productId: String!) {
    removeProduct(productId: $productId) {
      _id
    }
  }
`);

export const ADD_SALES = gql(/* GraphQL */ `
  mutation AddSales($saleInfo: ADDSALEINFO!) {
    addSale(saleInfo: $saleInfo) {
      ...SaleFields
    }
  }
`);

export const UPDATE_SALE = gql(`
  mutation UpdateSale($saleId: String!, $saleInfo: ADDSALEINFO!) {
    updateSale(saleId: $saleId, saleInfo: $saleInfo) {
      ...SaleFields
    }
  }
`);

export const DELETE_SALE = gql(/* GraphQL */ `
  mutation DeleteSale($saleId: String!) {
    removeSale(saleId: $saleId) {
      _id
    }
  }
`);

export const DELETE_PRODUCT_FILE = gql(`
  mutation DeleteProductResource($resourceId: String!, $fileUrl: String!, $resourceType: String!) {
    deleteProductFile(resourceId: $resourceId, fileUrl: $fileUrl, resourceType: $resourceType) {
      ...ProductFields
    }
  }
`);

export const DELETE_EXPENSE_FILE = gql(`
  mutation DeleteExpenseResource($resourceId: String!, $fileUrl: String!, $resourceType: String!) {
    deleteExpenseFile(resourceId: $resourceId, fileUrl: $fileUrl, resourceType: $resourceType) {
      ...ExpenseFields
    }
  }
`);
