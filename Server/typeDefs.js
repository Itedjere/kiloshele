import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql
    scalar Date

    type Query {
        user: String!
    }

    type Mutation {
        signup: String!
    }

`;
