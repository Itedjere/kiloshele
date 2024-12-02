import { GraphQLDateTime } from "graphql-scalars";

export const resolvers = {
  Date: GraphQLDateTime,
  Query: {
    user: async (parent, args, context) => {
      return "Hello World";
    },
  },
  Mutation: {
    signup: async (parent, args, context) => {
      return "Hello World";
    },
  },
};
