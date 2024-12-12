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
      category
    }
  }
`);
