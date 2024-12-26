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
        date: Date!
        payment_method: PaymentMethod!
        payment_status: PaymentStatus!
        mediaUrl: [String!]!
        additional_notes: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type ExpenseStats {
        todayExpenses: Float!
        monthExpenses: Float!
        yearExpenses: Float!
        lastYearExpenses: Float!
        highestExpenseCategory: String
        highestExpenseAmount: Float!
    }

    type OtherServiceFees {
        duration: String!
        cost_price: Float!
        selling_price: Float!
    }

    type Product {
        _id: String!
        company: Company!
        name: String!
        sku: String!
        type: ServiceOrProduct!
        category: String!
        quantity: Int!
        restock_level: Int!
        cost_price: Float!
        selling_price: Float!
        other_fees: [OtherServiceFees!]!
        description: String!
        supplier_name: String!
        supplier_phone: String!
        tags: [String!]!
        mediaUrl: [String!]!
        createdAt: Date!
    }

    type ProductStats {
        totalProducts: Int!
        totalInventoryValue: Float!,
        totalLowStock: Int!
        totalOutOfStock: Int!
    }

    type ServiceStats {
        totalServices: Int!
        averageServicePrice: Float!
        servicesWithAdditionalFees: Int!
    }

    type ProductServiceStats {
        productStats: ProductStats!
        serviceStats: ServiceStats!
    }

    type ProductInfoStats {
        totalQuantity: Int
        totalProfit: Int
        productName: String
    }

    type SaleStats {
        totalSalesToday: Int
        totalSalesThisMonth: Int
        totalRevenueToday: Float
        totalRevenueThisMonth: Float
        totalProfitToday: Float
        totalProfitThisMonth: Float
        topSellingProducts: [ProductInfoStats!]!
        lowSellingProducts: [ProductInfoStats!]!
        mostProfitableProducts: [ProductInfoStats!]!
    }

    type ItemSoldType {
        _id: String!
        product: Product!
        quantity: Int!
        cost_price: Float!
        selling_price: Float!
        other_fees: [OtherServiceFees!]!
    }

    type Sale {
        _id: String!
        company: Company!
        itemSold: [ItemSoldType!]!
        customer_name: String!
        customer_phone: String!
        customer_reference: String!
        staff_assigned: String!
        date: Date!
        payment_method: PaymentMethod!
        payment_status: PaymentStatus!
        additional_note: String!
    }

    type ServerResponse {
        status: Boolean!
        message: String!
    }

    type Query {
        expenses: [Expense!]!
        expenseOne(expenseId: String!): Expense!
        expensesCategories: [String!]!
        expenseStats: ExpenseStats!
        products(searchTerm: String, limit: Int!, offset: Int!): [Product!]!
        productOne(productId: String!): Product!
        productsCategories: [String!]!
        productStats: ProductServiceStats!
        sales: [Sale!]!
        saleOne(saleId: String!): Sale!
        saleStats: SaleStats!
    }

    type Mutation {
        signupCompany(signupInfo: ADDCOMPANYINPUT!): AuthenticatedCompany!
        loginCompany(loginInfo: LOGINCOMPANYINPUT!): AuthenticatedCompany!
        addExpense(expenseInfo: ADDEXPENSEINPUT!): Expense!
        updateExpense(expenseId: String!, expenseInfo: ADDEXPENSEINPUT!): Expense!
        removeExpense(expenseId: String!): Expense!
        addProduct(productInfo: ADDPRODUCTINPUT!): Product!
        updateProduct(productId: String!, productInfo: ADDPRODUCTINPUT!): Product!
        removeProduct(productId: String!): Product!
        addSale(saleInfo: ADDSALEINFO!): Sale!
        updateSale(saleId: String!, saleInfo: ADDSALEINFO!): Sale!
        removeSale(saleId: String!): Sale!
        deleteProductFile(resourceId: String!, fileUrl: String!, resourceType: String!): Product!
        deleteExpenseFile(resourceId: String!, fileUrl: String!, resourceType: String!): Expense!
    }

    input PRODUCTFILTERINPUT {
        searchTerm: String
        category: String
        type: ServiceOrProduct
        limit: Int!
        offset: Int!
    }

    input OtherServiceFeesInput {
        duration: String!
        cost_price: Float!
        selling_price: Float!
    }

    input ItemSoldInput {
        product: String!
        quantity: Int!
        cost_price: Float!
        selling_price: Float!
        other_fees: [OtherServiceFeesInput!]!
    }

    input ADDSALEINFO {
        itemSold: [ItemSoldInput!]!
        customer_name: String
        customer_phone: String
        customer_reference: String
        staff_assigned: String
        date: Date!
        payment_method: PaymentMethod!
        payment_status: PaymentStatus!
        additional_note: String
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
        mediaUrl: [String!]!
    }

    input ADDEXPENSEINPUT {
        title: String!
        amount: Float!
        category: String!
        date: Date!
        payment_method: PaymentMethod!
        payment_status: PaymentStatus!
        mediaUrl: [String!]!
        additional_notes: String
    }

    input ADDCOMPANYINPUT {
        name: String!
        username: String!
        email: String
        password: String!
    }

    input LOGINCOMPANYINPUT {
        username: String!
        password: String!
    }

`;
