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
    "\n  fragment ExpenseFields on Expense {\n    _id\n    title\n    category\n    date\n    amount\n    payment_method\n    payment_status\n    additional_notes\n    mediaUrl\n  }\n": types.ExpenseFieldsFragmentDoc,
    "\n    fragment ProductFields on Product {\n      _id\n      name\n      sku\n      other_fees {\n        cost_price\n        duration\n        selling_price\n      }\n      description\n      supplier_name\n      supplier_phone\n      tags\n      photos\n      category\n      createdAt\n      cost_price\n      selling_price\n      quantity\n      restock_level\n      photos\n      type\n    }\n": types.ProductFieldsFragmentDoc,
    "\n  fragment SaleFields on Sale {\n    _id\n    itemSold {\n      product {\n        name\n        category\n        type\n      }\n      cost_price\n      selling_price\n      quantity\n      _id\n    }\n    customer_name\n    customer_phone\n    customer_reference\n    date\n    payment_method\n    payment_status\n    staff_assigned\n    additional_note\n  }\n": types.SaleFieldsFragmentDoc,
    "\n  mutation SignupCompany($signupInfo: ADDCOMPANYINPUT!) {\n    signupCompany(signupInfo: $signupInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n": types.SignupCompanyDocument,
    "\n  mutation LoginCompany($loginInfo: LOGINCOMPANYINPUT!) {\n    loginCompany(loginInfo: $loginInfo) {\n      token\n      company {\n        _id\n        name\n        username\n        email\n      }\n    }\n  }\n": types.LoginCompanyDocument,
    "\n  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {\n    addExpense(expenseInfo: $expenseInfo) {\n      ...ExpenseFields\n    }\n  }\n": types.AddExpensesDocument,
    "\n  mutation UpdateExpense($expenseId: String!, $expenseInfo: ADDEXPENSEINPUT!) {\n    updateExpense(expenseId: $expenseId, expenseInfo: $expenseInfo) {\n      ...ExpenseFields\n    }\n  }\n": types.UpdateExpenseDocument,
    "\n  mutation DeleteExpense($expenseId: String!) {\n    removeExpense(expenseId: $expenseId) {\n      _id\n    }\n  }\n": types.DeleteExpenseDocument,
    "\n  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {\n    addProduct(productInfo: $productInfo) {\n      category\n    }\n  }\n": types.AddProductDocument,
    "\n  mutation UpdateProduct($productId: String!, $productInfo: ADDPRODUCTINPUT!) {\n    updateProduct(productId: $productId, productInfo: $productInfo) {\n      ...ProductFields\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation DeleteProduct($productId: String!) {\n    removeProduct(productId: $productId) {\n      _id\n    }\n  }\n": types.DeleteProductDocument,
    "\n  mutation AddSales($saleInfo: ADDSALEINFO!) {\n    addSale(saleInfo: $saleInfo) {\n      ...SaleFields\n    }\n  }\n": types.AddSalesDocument,
    "\n  mutation UpdateSale($saleId: String!, $saleInfo: ADDSALEINFO!) {\n    updateSale(saleId: $saleId, saleInfo: $saleInfo) {\n      ...SaleFields\n    }\n  }\n": types.UpdateSaleDocument,
    "\n  mutation DeleteSale($saleId: String!) {\n    removeSale(saleId: $saleId) {\n      _id\n    }\n  }\n": types.DeleteSaleDocument,
    "\n  query ExpensesCategories {\n    expensesCategories\n  }\n": types.ExpensesCategoriesDocument,
    "\n  query ProductCategories {\n    productsCategories\n  }\n": types.ProductCategoriesDocument,
    "\n  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {\n    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {\n      ...ProductFields\n    }\n  }\n": types.ProductsDocument,
    "\n  query FetchProduct($productId: String!) {\n    productOne(productId: $productId) {\n        ...ProductFields\n    }\n  }\n": types.FetchProductDocument,
    "\n  query Expenses {\n    expenses {\n      ...ExpenseFields\n    }\n  }\n": types.ExpensesDocument,
    "\n  query FetchExpense($expenseId: String!) {\n    expenseOne(expenseId: $expenseId) {\n        ...ExpenseFields\n    }\n}\n": types.FetchExpenseDocument,
    "\n  query Sales {\n    sales {\n      ...SaleFields\n    }\n  }  \n": types.SalesDocument,
    "\n  query FetchSale($saleId: String!) {\n    saleOne(saleId: $saleId) {\n        ...SaleFields\n    }\n  }\n": types.FetchSaleDocument,
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
export function gql(source: "\n  fragment ExpenseFields on Expense {\n    _id\n    title\n    category\n    date\n    amount\n    payment_method\n    payment_status\n    additional_notes\n    mediaUrl\n  }\n"): (typeof documents)["\n  fragment ExpenseFields on Expense {\n    _id\n    title\n    category\n    date\n    amount\n    payment_method\n    payment_status\n    additional_notes\n    mediaUrl\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment ProductFields on Product {\n      _id\n      name\n      sku\n      other_fees {\n        cost_price\n        duration\n        selling_price\n      }\n      description\n      supplier_name\n      supplier_phone\n      tags\n      photos\n      category\n      createdAt\n      cost_price\n      selling_price\n      quantity\n      restock_level\n      photos\n      type\n    }\n"): (typeof documents)["\n    fragment ProductFields on Product {\n      _id\n      name\n      sku\n      other_fees {\n        cost_price\n        duration\n        selling_price\n      }\n      description\n      supplier_name\n      supplier_phone\n      tags\n      photos\n      category\n      createdAt\n      cost_price\n      selling_price\n      quantity\n      restock_level\n      photos\n      type\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment SaleFields on Sale {\n    _id\n    itemSold {\n      product {\n        name\n        category\n        type\n      }\n      cost_price\n      selling_price\n      quantity\n      _id\n    }\n    customer_name\n    customer_phone\n    customer_reference\n    date\n    payment_method\n    payment_status\n    staff_assigned\n    additional_note\n  }\n"): (typeof documents)["\n  fragment SaleFields on Sale {\n    _id\n    itemSold {\n      product {\n        name\n        category\n        type\n      }\n      cost_price\n      selling_price\n      quantity\n      _id\n    }\n    customer_name\n    customer_phone\n    customer_reference\n    date\n    payment_method\n    payment_status\n    staff_assigned\n    additional_note\n  }\n"];
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
export function gql(source: "\n  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {\n    addExpense(expenseInfo: $expenseInfo) {\n      ...ExpenseFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddExpenses($expenseInfo: ADDEXPENSEINPUT!) {\n    addExpense(expenseInfo: $expenseInfo) {\n      ...ExpenseFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateExpense($expenseId: String!, $expenseInfo: ADDEXPENSEINPUT!) {\n    updateExpense(expenseId: $expenseId, expenseInfo: $expenseInfo) {\n      ...ExpenseFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateExpense($expenseId: String!, $expenseInfo: ADDEXPENSEINPUT!) {\n    updateExpense(expenseId: $expenseId, expenseInfo: $expenseInfo) {\n      ...ExpenseFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteExpense($expenseId: String!) {\n    removeExpense(expenseId: $expenseId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteExpense($expenseId: String!) {\n    removeExpense(expenseId: $expenseId) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {\n    addProduct(productInfo: $productInfo) {\n      category\n    }\n  }\n"): (typeof documents)["\n  mutation AddProduct($productInfo: ADDPRODUCTINPUT!) {\n    addProduct(productInfo: $productInfo) {\n      category\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProduct($productId: String!, $productInfo: ADDPRODUCTINPUT!) {\n    updateProduct(productId: $productId, productInfo: $productInfo) {\n      ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProduct($productId: String!, $productInfo: ADDPRODUCTINPUT!) {\n    updateProduct(productId: $productId, productInfo: $productInfo) {\n      ...ProductFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProduct($productId: String!) {\n    removeProduct(productId: $productId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProduct($productId: String!) {\n    removeProduct(productId: $productId) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddSales($saleInfo: ADDSALEINFO!) {\n    addSale(saleInfo: $saleInfo) {\n      ...SaleFields\n    }\n  }\n"): (typeof documents)["\n  mutation AddSales($saleInfo: ADDSALEINFO!) {\n    addSale(saleInfo: $saleInfo) {\n      ...SaleFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSale($saleId: String!, $saleInfo: ADDSALEINFO!) {\n    updateSale(saleId: $saleId, saleInfo: $saleInfo) {\n      ...SaleFields\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSale($saleId: String!, $saleInfo: ADDSALEINFO!) {\n    updateSale(saleId: $saleId, saleInfo: $saleInfo) {\n      ...SaleFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSale($saleId: String!) {\n    removeSale(saleId: $saleId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSale($saleId: String!) {\n    removeSale(saleId: $saleId) {\n      _id\n    }\n  }\n"];
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
export function gql(source: "\n  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {\n    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {\n      ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  query Products($searchTerm: String, $limit: Int!, $offset: Int!) {\n    products(searchTerm: $searchTerm, limit: $limit, offset: $offset) {\n      ...ProductFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchProduct($productId: String!) {\n    productOne(productId: $productId) {\n        ...ProductFields\n    }\n  }\n"): (typeof documents)["\n  query FetchProduct($productId: String!) {\n    productOne(productId: $productId) {\n        ...ProductFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Expenses {\n    expenses {\n      ...ExpenseFields\n    }\n  }\n"): (typeof documents)["\n  query Expenses {\n    expenses {\n      ...ExpenseFields\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchExpense($expenseId: String!) {\n    expenseOne(expenseId: $expenseId) {\n        ...ExpenseFields\n    }\n}\n"): (typeof documents)["\n  query FetchExpense($expenseId: String!) {\n    expenseOne(expenseId: $expenseId) {\n        ...ExpenseFields\n    }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Sales {\n    sales {\n      ...SaleFields\n    }\n  }  \n"): (typeof documents)["\n  query Sales {\n    sales {\n      ...SaleFields\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchSale($saleId: String!) {\n    saleOne(saleId: $saleId) {\n        ...SaleFields\n    }\n  }\n"): (typeof documents)["\n  query FetchSale($saleId: String!) {\n    saleOne(saleId: $saleId) {\n        ...SaleFields\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;