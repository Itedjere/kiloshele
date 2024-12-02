import { GraphQLDateTime } from "graphql-scalars";
import { signupCompany } from "./services/company/signupCompany.js";
import { loginCompany } from "./services/company/loginCompany.js";
import { addExpense } from "./services/expense/addExpense.js";
import { fetchExpenses } from "./services/expense/fetchExpenses.js";
import { editExpense } from "./services/expense/editExpense.js";
import { deleteExpense } from "./services/expense/deleteExpense.js";

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
  },
};
