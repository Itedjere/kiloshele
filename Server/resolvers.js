import { GraphQLDateTime } from "graphql-scalars";
import { signupCompany } from "./services/company/signupCompany.js";
import { loginCompany } from "./services/company/loginCompany.js";
import { addExpense } from "./services/expense/addExpense.js";
import { fetchExpenses } from "./services/expense/fetchExpenses.js";
import { editExpense } from "./services/expense/editExpense.js";
import { deleteExpense } from "./services/expense/deleteExpense.js";
import { createProduct } from "./services/product/createProduct.js";
import { editProduct } from "./services/product/editProduct.js";
import { fetchProducts } from "./services/product/fetchProducts.js";
import { deleteProduct } from "./services/product/deleteProduct.js";
import { addTransaction } from "./services/transaction/addTransaction.js";
import { updateTransaction } from "./services/transaction/updateTransaction.js";
import { fetchSales } from "./services/transaction/fetchSales.js";
import { deleteTransaction } from "./services/transaction/deleteTransaction.js";
import { fetchExpensesCategories } from "./services/expense/fetchExpensesCategories.js";
import { fetchProductsCategories } from "./services/product/fetchProductsCategories.js";

export const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    expenses: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await fetchExpenses(req);
      } catch (error) {
        console.error("Error fetching all expenses:", error);
        throw error;
      }
    },
    expensesCategories: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await fetchExpensesCategories(req);
      } catch (error) {
        console.error("Error fetching expenses categories:", error);
        throw error;
      }
    },
    products: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await fetchProducts(req);
      } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
      }
    },
    productsCategories: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await fetchProductsCategories(req);
      } catch (error) {
        console.error("Error fetching expenses categories:", error);
        throw error;
      }
    },
    sales: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await fetchSales(req);
      } catch (error) {
        console.error("Error fetching all sales:", error);
        throw error;
      }
    },
  },
  Mutation: {
    signupCompany: async (parent, args, context) => {
      try {
        const { signupInfo } = args;
        return await signupCompany(signupInfo);
      } catch (error) {
        console.error("Error signing up company:", error);
        throw error;
      }
    },
    loginCompany: async (parent, args, context) => {
      try {
        const { loginInfo } = args;
        return await loginCompany(loginInfo);
      } catch (error) {
        console.error("Error login company:", error);
        throw error;
      }
    },
    addExpense: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await addExpense(args, req);
      } catch (error) {
        console.error("Failed to add expense:", error);
        throw error;
      }
    },
    updateExpense: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await editExpense(args, req);
      } catch (error) {
        console.error("Failed to edit expense:", error);
        throw error;
      }
    },
    removeExpense: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await deleteExpense(args, req);
      } catch (error) {
        console.error("Failed to delete expense:", error);
        throw error;
      }
    },
    addProduct: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await createProduct(args, req);
      } catch (error) {
        console.error("Failed to add Product:", error);
        throw error;
      }
    },
    updateProduct: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await editProduct(args, req);
      } catch (error) {
        console.error("Failed to add Product:", error);
        throw error;
      }
    },
    removeProduct: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await deleteProduct(args, req);
      } catch (error) {
        console.error("Failed to delete product:", error);
        throw error;
      }
    },
    addSale: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await addTransaction(args, req);
      } catch (error) {
        console.error("Failed to add Sale:", error);
        throw error;
      }
    },
    updateSale: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await updateTransaction(args, req);
      } catch (error) {
        console.error("Failed to update Sale:", error);
        throw error;
      }
    },
    removeSale: async (parent, args, context) => {
      try {
        const { req } = context;
        if (!req.isAuth) {
          throw new Error("User is not authenticated");
        }
        return await deleteTransaction(args, req);
      } catch (error) {
        console.error("Failed to delete Sale:", error);
        throw error;
      }
    },
  },
};
