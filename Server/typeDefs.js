import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql
    scalar Date

    enum PaymentMethod {
        CARD
        CASH
        BANK_TRANSFER
    }

    enum ServiceOrProduct {
        PRODUCT
        SERVICE
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

    type OtherServiceFees {
        duration: String!
        cost_price: Float!
        selling_price: Float!
    }

    type Product {
        _id: String!
        name: String!
        sku: String
        type: ServiceOrProduct!
        category: String!
        quantity: Int!
        restock_level: Int
        cost_price: Float!
        selling_price: Float!
        other_fees: [OtherServiceFees!]!
        description: String
        supplier_name: String
        supplier_phone: String
        tags: [String!]!
        photos: [String!]!
        createdAt: Date!
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
        addProduct(productInfo: ADDPRODUCTINPUT!): Product!
    }

    input OtherServiceFeesInput {
        duration: String!
        cost_price: Float!
        selling_price: Float!
    }

    input ADDPRODUCTINPUT {
        name: String!
        sku: String
        type: ServiceOrProduct!
        category: String!
        quantity: Int!
        restock_level: Int
        cost_price: Float!
        selling_price: Float!
        other_fees: [OtherServiceFeesInput!]!
        description: String
        supplier_name: String
        supplier_phone: String
        tags: [String!]!
        photos: [String!]!
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
