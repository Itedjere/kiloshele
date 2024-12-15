/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  mutation SignupCompany($signupInfo: ADDCOMPANYINPUT!) {\n    signupCompany(signupInfo: $signupInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n": types.SignupCompanyDocument,
    "\n  mutation LoginCompany($loginInfo: LOGINCOMPANYINPUT!) {\n    loginCompany(loginInfo: $loginInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n": types.LoginCompanyDocument,
    "\n  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {\n    addExpense(expenseInfo: $expenseInfo) {\n      category\n    }\n  }\n": types.AddExpensesDocument,
    "\n  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {\n    addProduct(productInfo: $productInfo) {\n      category\n    }\n  }\n": types.AddProductDocument,
    "\n  mutation AddSales($saleInfo: ADDSALEINFO!) {\n    addSale(saleInfo: $saleInfo) {\n      _id\n      staff_assigned\n      additional_note\n      customer_name\n      customer_phone\n      customer_reference\n      date\n      payment_method\n      payment_status\n      itemSold {\n        _id\n        cost_price\n        selling_price\n        quantity\n      }\n    }\n  }\n": types.AddSalesDocument,
    "\n  query ExpensesCategories {\n    expensesCategories\n  }\n": types.ExpensesCategoriesDocument,
    "\n  query ProductCategories {\n    productsCategories\n  }\n": types.ProductCategoriesDocument,
    "\n  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {\n    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {\n      _id\n      name\n      sku\n      other_fees {\n        cost_price\n        duration\n        selling_price\n      }\n      description\n      supplier_name\n      supplier_phone\n      tags\n      photos\n      category\n      createdAt\n      cost_price\n      selling_price\n      quantity\n      restock_level\n      photos\n      type\n    }\n  }\n": types.ProductsDocument,
    "\n  query Expenses {\n    expenses {\n      _id\n      title\n      category\n      date\n      amount\n      payment_method\n      payment_status\n      additional_notes\n      mediaUrl\n    }\n  }\n": types.ExpensesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SignupCompany($signupInfo: ADDCOMPANYINPUT!) {\n    signupCompany(signupInfo: $signupInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SignupCompany($signupInfo: ADDCOMPANYINPUT!) {\n    signupCompany(signupInfo: $signupInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginCompany($loginInfo: LOGINCOMPANYINPUT!) {\n    loginCompany(loginInfo: $loginInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation LoginCompany($loginInfo: LOGINCOMPANYINPUT!) {\n    loginCompany(loginInfo: $loginInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {\n    addExpense(expenseInfo: $expenseInfo) {\n      category\n    }\n  }\n"): (typeof documents)["\n  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {\n    addExpense(expenseInfo: $expenseInfo) {\n      category\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {\n    addProduct(productInfo: $productInfo) {\n      category\n    }\n  }\n"): (typeof documents)["\n  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {\n    addProduct(productInfo: $productInfo) {\n      category\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddSales($saleInfo: ADDSALEINFO!) {\n    addSale(saleInfo: $saleInfo) {\n      _id\n      staff_assigned\n      additional_note\n      customer_name\n      customer_phone\n      customer_reference\n      date\n      payment_method\n      payment_status\n      itemSold {\n        _id\n        cost_price\n        selling_price\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddSales($saleInfo: ADDSALEINFO!) {\n    addSale(saleInfo: $saleInfo) {\n      _id\n      staff_assigned\n      additional_note\n      customer_name\n      customer_phone\n      customer_reference\n      date\n      payment_method\n      payment_status\n      itemSold {\n        _id\n        cost_price\n        selling_price\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ExpensesCategories {\n    expensesCategories\n  }\n"): (typeof documents)["\n  query ExpensesCategories {\n    expensesCategories\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProductCategories {\n    productsCategories\n  }\n"): (typeof documents)["\n  query ProductCategories {\n    productsCategories\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {\n    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {\n      _id\n      name\n      sku\n      other_fees {\n        cost_price\n        duration\n        selling_price\n      }\n      description\n      supplier_name\n      supplier_phone\n      tags\n      photos\n      category\n      createdAt\n      cost_price\n      selling_price\n      quantity\n      restock_level\n      photos\n      type\n    }\n  }\n"): (typeof documents)["\n  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {\n    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {\n      _id\n      name\n      sku\n      other_fees {\n        cost_price\n        duration\n        selling_price\n      }\n      description\n      supplier_name\n      supplier_phone\n      tags\n      photos\n      category\n      createdAt\n      cost_price\n      selling_price\n      quantity\n      restock_level\n      photos\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Expenses {\n    expenses {\n      _id\n      title\n      category\n      date\n      amount\n      payment_method\n      payment_status\n      additional_notes\n      mediaUrl\n    }\n  }\n"): (typeof documents)["\n  query Expenses {\n    expenses {\n      _id\n      title\n      category\n      date\n      amount\n      payment_method\n      payment_status\n      additional_notes\n      mediaUrl\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;