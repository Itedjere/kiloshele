import { GraphQLDateTime } from "graphql-scalars";
import { signupCompany } from "./services/company/signupCompany.js";

export const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    user: async (parent, args, context) => {
      return "Hello World";
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
  },
};
