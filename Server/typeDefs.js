import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql
    scalar Date

    type Company {
        name: String!
        email: String!
    }

    type AuthenticatedCompany {
        token: String!
        company: Company!
    }

    type Query {
        user: String!
    }

    type Mutation {
        signupCompany(signupInfo: ADDCOMPANYINPUT!): AuthenticatedCompany!
    }

    input ADDCOMPANYINPUT {
        name: String!
        email: String!
        password: String!
    }

`;
