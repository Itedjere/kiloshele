import { gql } from "../__generated__/gql";

export const SIGNUP_COMPANY = gql(/* GraphQL */ `
  mutation SignupCompany($signupInfo: ADDCOMPANYINPUT!) {
    signupCompany(signupInfo: $signupInfo) {
      token
      company {
        _id
        name
        username
        email
      }
    }
  }
`);

export const LOGIN_COMPANY = gql(/* GraphQL */ `
  mutation LoginCompany($loginInfo: LOGINCOMPANYINPUT!) {
    loginCompany(loginInfo: $loginInfo) {
      token
      company {
        _id
        name
        username
        email
      }
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
      category
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
      _id
      staff_assigned
      additional_note
      customer_name
      customer_phone
      customer_reference
      date
      payment_method
      payment_status
      itemSold {
        _id
        cost_price
        selling_price
        quantity
      }
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
