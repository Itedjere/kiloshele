import { GraphQLDateTime } from "graphql-scalars";

export const typeDefs = `#graphql
    scalar Date

    type Company {
        name: String!
        username: String!
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
        loginCompany(loginInfo: LOGINCOMPANYINPUT!): AuthenticatedCompany!
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
