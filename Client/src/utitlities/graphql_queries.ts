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
  query Products($searchTerm: String, $cursor: String) {
    products(searchTerm: $searchTerm, cursor: $cursor) {
      list {
        ...ProductFields
      }
      nextCursor
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

export const PRODUCT_STATS = gql(`
  query ProductStats {
    productStats {
      productStats {
        totalInventoryValue
        totalLowStock
        totalOutOfStock
        totalProducts
      }
      serviceStats {
        averageServicePrice
        servicesWithAdditionalFees
        totalServices
      }
    }
  }
`);

export const SALES_STATS = gql(`
  query SaleStats {
    saleStats {
      lowSellingProducts {
        productName
        totalQuantity
      }
      topSellingProducts {
        productName
        totalQuantity
      }
      mostProfitableProducts {
        productName
        totalProfit
      }
      totalProfitThisMonth
      totalProfitToday
      totalRevenueThisMonth
      totalRevenueToday
      totalSalesToday
      totalSalesThisMonth
    }
  }
`);

export const GET_EXPENSES = gql(/* GraphQL */ `
  query Expenses($cursor: String) {
    expenses(cursor: $cursor) {
      list {
        ...ExpenseFields
      }
      nextCursor
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

export const EXPENSES_STATS = gql(`
  query ExpenseStats {
    expenseStats {
      todayExpenses
      monthExpenses
      yearExpenses
      lastYearExpenses
      highestExpenseAmount
      highestExpenseCategory
    }
  }  
`);

export const GET_SALES = gql(`
  query Sales($filters: SALESFILTERINPUT) {
  sales(filters: $filters) {
      list {
        ...SaleFields
      }
      totalResults
      nextCursor
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
