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
