import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql
    scalar Date

    enum PaymentMethod {
        CARD
        CASH
        BANK_TRANSFER
    }

    enum PaymentStatus {
        PAID
        PENDING
        PARTIALLY_PAID
    }

    type Company {
        _id: String!
        name: String!
        username: String!
        email: String!
    }

    type AuthenticatedCompany {
        token: String!
        company: Company!
    }

    type Expense {
        _id: String!
        company: Company!
        title: String!
        amount: Float!
        category: String!
        payment_method: PaymentMethod!
        payment_status: PaymentStatus!
        mediaUrl: [String!]!
        additional_notes: String
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        expenses: [Expense!]!
    }

    type Mutation {
        signupCompany(signupInfo: ADDCOMPANYINPUT!): AuthenticatedCompany!
        loginCompany(loginInfo: LOGINCOMPANYINPUT!): AuthenticatedCompany!
        addExpense(expenseInfo: ADDEXPENSEINPUT!): Expense!
        updateExpense(expenseId: String!, expenseInfo: ADDEXPENSEINPUT!): Expense!
        removeExpense(expenseId: String!): Expense!
    }

    input ADDEXPENSEINPUT {
        title: String!
        amount: Float!
        category: String!
        payment_method: PaymentMethod!
        payment_status: PaymentStatus!
        mediaUrl: [String!]!
        additional_notes: String
    }

    input ADDCOMPANYINPUT {
        name: String!
        username: String!
        email: String!
        password: String!
    }

    input LOGINCOMPANYINPUT {
        username: String!
        password: String!
    }

`;
