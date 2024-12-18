/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Addcompanyinput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Addexpenseinput = {
  additional_notes?: InputMaybe<Scalars['String']['input']>;
  amount: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  date: Scalars['DateTime']['input'];
  mediaUrl: Array<Scalars['String']['input']>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  title: Scalars['String']['input'];
};

export type Addproductinput = {
  category: Scalars['String']['input'];
  cost_price: Scalars['Float']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  other_fees: Array<OtherServiceFeesInput>;
  photos: Array<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  restock_level?: InputMaybe<Scalars['Int']['input']>;
  selling_price: Scalars['Float']['input'];
  sku?: InputMaybe<Scalars['String']['input']>;
  supplier_name?: InputMaybe<Scalars['String']['input']>;
  supplier_phone?: InputMaybe<Scalars['String']['input']>;
  tags: Array<Scalars['String']['input']>;
  type: ServiceOrProduct;
};

export type Addsaleinfo = {
  additional_note?: InputMaybe<Scalars['String']['input']>;
  customer_name?: InputMaybe<Scalars['String']['input']>;
  customer_phone?: InputMaybe<Scalars['String']['input']>;
  customer_reference?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['DateTime']['input'];
  itemSold: Array<ItemSoldInput>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  staff_assigned?: InputMaybe<Scalars['String']['input']>;
};

export type AuthenticatedCompany = {
  __typename?: 'AuthenticatedCompany';
  company: Company;
  token: Scalars['String']['output'];
};

export type Company = {
  __typename?: 'Company';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Expense = {
  __typename?: 'Expense';
  _id: Scalars['String']['output'];
  additional_notes: Scalars['String']['output'];
  amount: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  mediaUrl: Array<Scalars['String']['output']>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ItemSoldInput = {
  cost_price: Scalars['Float']['input'];
  product: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  selling_price?: InputMaybe<Scalars['Float']['input']>;
};

export type ItemSoldType = {
  __typename?: 'ItemSoldType';
  _id: Scalars['String']['output'];
  cost_price: Scalars['Float']['output'];
  product: Product;
  quantity: Scalars['Int']['output'];
  selling_price: Scalars['Float']['output'];
};

export type Logincompanyinput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExpense: Expense;
  addProduct: Product;
  addSale: Sale;
  loginCompany: AuthenticatedCompany;
  removeExpense: Expense;
  removeProduct: Product;
  removeSale: Sale;
  signupCompany: AuthenticatedCompany;
  updateExpense: Expense;
  updateProduct: Product;
  updateSale: Sale;
};


export type MutationAddExpenseArgs = {
  expenseInfo: Addexpenseinput;
};


export type MutationAddProductArgs = {
  productInfo: Addproductinput;
};


export type MutationAddSaleArgs = {
  saleInfo: Addsaleinfo;
};


export type MutationLoginCompanyArgs = {
  loginInfo: Logincompanyinput;
};


export type MutationRemoveExpenseArgs = {
  expenseId: Scalars['String']['input'];
};


export type MutationRemoveProductArgs = {
  productId: Scalars['String']['input'];
};


export type MutationRemoveSaleArgs = {
  saleId: Scalars['String']['input'];
};


export type MutationSignupCompanyArgs = {
  signupInfo: Addcompanyinput;
};


export type MutationUpdateExpenseArgs = {
  expenseId: Scalars['String']['input'];
  expenseInfo: Addexpenseinput;
};


export type MutationUpdateProductArgs = {
  productId: Scalars['String']['input'];
  productInfo: Addproductinput;
};


export type MutationUpdateSaleArgs = {
  saleId: Scalars['String']['input'];
  saleInfo: Addsaleinfo;
};

export type OtherServiceFees = {
  __typename?: 'OtherServiceFees';
  cost_price: Scalars['Float']['output'];
  duration: Scalars['String']['output'];
  selling_price: Scalars['Float']['output'];
};

export type OtherServiceFeesInput = {
  cost_price: Scalars['Float']['input'];
  duration: Scalars['String']['input'];
  selling_price: Scalars['Float']['input'];
};

export type Productfilterinput = {
  category?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ServiceOrProduct>;
};

export enum PaymentMethod {
  BankTransfer = 'BANK_TRANSFER',
  Card = 'CARD',
  Cash = 'CASH'
}

export enum PaymentStatus {
  Paid = 'PAID',
  PartiallyPaid = 'PARTIALLY_PAID',
  Pending = 'PENDING'
}

export type Product = {
  __typename?: 'Product';
  _id: Scalars['String']['output'];
  category: Scalars['String']['output'];
  company: Company;
  cost_price: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  name: Scalars['String']['output'];
  other_fees: Array<OtherServiceFees>;
  photos: Array<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  restock_level: Scalars['Int']['output'];
  selling_price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  supplier_name: Scalars['String']['output'];
  supplier_phone: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  type: ServiceOrProduct;
};

export type Query = {
  __typename?: 'Query';
  expenseOne: Expense;
  expenses: Array<Expense>;
  expensesCategories: Array<Scalars['String']['output']>;
  productOne: Product;
  products: Array<Product>;
  productsCategories: Array<Scalars['String']['output']>;
  saleOne: Sale;
  sales: Array<Sale>;
};


export type QueryExpenseOneArgs = {
  expenseId: Scalars['String']['input'];
};


export type QueryProductOneArgs = {
  productId: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySaleOneArgs = {
  saleId: Scalars['String']['input'];
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['String']['output'];
  additional_note: Scalars['String']['output'];
  company: Company;
  customer_name: Scalars['String']['output'];
  customer_phone: Scalars['String']['output'];
  customer_reference: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  itemSold: Array<ItemSoldType>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  staff_assigned: Scalars['String']['output'];
};

export enum ServiceOrProduct {
  Product = 'PRODUCT',
  Service = 'SERVICE'
}

export type ExpenseFieldsFragment = { __typename?: 'Expense', _id: string, title: string, category: string, date: any, amount: number, payment_method: PaymentMethod, payment_status: PaymentStatus, additional_notes: string, mediaUrl: Array<string> } & { ' $fragmentName'?: 'ExpenseFieldsFragment' };

export type ProductFieldsFragment = { __typename?: 'Product', _id: string, name: string, sku: string, description: string, supplier_name: string, supplier_phone: string, tags: Array<string>, photos: Array<string>, category: string, createdAt: any, cost_price: number, selling_price: number, quantity: number, restock_level: number, type: ServiceOrProduct, other_fees: Array<{ __typename?: 'OtherServiceFees', cost_price: number, duration: string, selling_price: number }> } & { ' $fragmentName'?: 'ProductFieldsFragment' };

export type SaleFieldsFragment = { __typename?: 'Sale', _id: string, customer_name: string, customer_phone: string, customer_reference: string, date: any, payment_method: PaymentMethod, payment_status: PaymentStatus, staff_assigned: string, additional_note: string, itemSold: Array<{ __typename?: 'ItemSoldType', cost_price: number, selling_price: number, quantity: number, _id: string, product: { __typename?: 'Product', name: string, category: string, type: ServiceOrProduct } }> } & { ' $fragmentName'?: 'SaleFieldsFragment' };

export type SignupCompanyMutationVariables = Exact<{
  signupInfo: Addcompanyinput;
}>;


export type SignupCompanyMutation = { __typename?: 'Mutation', signupCompany: { __typename?: 'AuthenticatedCompany', token: string, company: { __typename?: 'Company', _id: string, name: string, username: string, email: string } } };

export type LoginCompanyMutationVariables = Exact<{
  loginInfo: Logincompanyinput;
}>;


export type LoginCompanyMutation = { __typename?: 'Mutation', loginCompany: { __typename?: 'AuthenticatedCompany', token: string, company: { __typename?: 'Company', _id: string, name: string, username: string, email: string } } };

export type AddExpensesMutationVariables = Exact<{
  expenseInfo: Addexpenseinput;
}>;


export type AddExpensesMutation = { __typename?: 'Mutation', addExpense: (
    { __typename?: 'Expense' }
    & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
  ) };

export type UpdateExpenseMutationVariables = Exact<{
  expenseId: Scalars['String']['input'];
  expenseInfo: Addexpenseinput;
}>;


export type UpdateExpenseMutation = { __typename?: 'Mutation', updateExpense: (
    { __typename?: 'Expense' }
    & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
  ) };

export type DeleteExpenseMutationVariables = Exact<{
  expenseId: Scalars['String']['input'];
}>;


export type DeleteExpenseMutation = { __typename?: 'Mutation', removeExpense: { __typename?: 'Expense', _id: string } };

export type AddProductMutationVariables = Exact<{
  productInfo: Addproductinput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'Product', category: string } };

export type UpdateProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
  productInfo: Addproductinput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
  ) };

export type DeleteProductMutationVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', removeProduct: { __typename?: 'Product', _id: string } };

export type AddSalesMutationVariables = Exact<{
  saleInfo: Addsaleinfo;
}>;


export type AddSalesMutation = { __typename?: 'Mutation', addSale: (
    { __typename?: 'Sale' }
    & { ' $fragmentRefs'?: { 'SaleFieldsFragment': SaleFieldsFragment } }
  ) };

export type DeleteSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type DeleteSaleMutation = { __typename?: 'Mutation', removeSale: { __typename?: 'Sale', _id: string } };

export type ExpensesCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpensesCategoriesQuery = { __typename?: 'Query', expensesCategories: Array<string> };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { __typename?: 'Query', productsCategories: Array<string> };

export type ProductsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
}>;


export type ProductsQuery = { __typename?: 'Query', products: Array<(
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
  )> };

export type FetchProductQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type FetchProductQuery = { __typename?: 'Query', productOne: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
  ) };

export type ExpensesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpensesQuery = { __typename?: 'Query', expenses: Array<(
    { __typename?: 'Expense' }
    & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
  )> };

export type FetchExpenseQueryVariables = Exact<{
  expenseId: Scalars['String']['input'];
}>;


export type FetchExpenseQuery = { __typename?: 'Query', expenseOne: (
    { __typename?: 'Expense' }
    & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
  ) };

export type SalesQueryVariables = Exact<{ [key: string]: never; }>;


export type SalesQuery = { __typename?: 'Query', sales: Array<(
    { __typename?: 'Sale' }
    & { ' $fragmentRefs'?: { 'SaleFieldsFragment': SaleFieldsFragment } }
  )> };

export type FetchSaleQueryVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type FetchSaleQuery = { __typename?: 'Query', saleOne: (
    { __typename?: 'Sale' }
    & { ' $fragmentRefs'?: { 'SaleFieldsFragment': SaleFieldsFragment } }
  ) };

export const ExpenseFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<ExpenseFieldsFragment, unknown>;
export const ProductFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<ProductFieldsFragment, unknown>;
export const SaleFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<SaleFieldsFragment, unknown>;
export const SignupCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDCOMPANYINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SignupCompanyMutation, SignupCompanyMutationVariables>;
export const LoginCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LOGINCOMPANYINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginCompanyMutation, LoginCompanyMutationVariables>;
export const AddExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDEXPENSEINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<AddExpensesMutation, AddExpensesMutationVariables>;
export const UpdateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDEXPENSEINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"expenseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const DeleteExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDPRODUCTINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDPRODUCTINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const AddSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDSALEINFO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<AddSalesMutation, AddSalesMutationVariables>;
export const DeleteSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const ExpensesCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpensesCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expensesCategories"}}]}}]} as unknown as DocumentNode<ExpensesCategoriesQuery, ExpensesCategoriesQueryVariables>;
export const ProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsCategories"}}]}}]} as unknown as DocumentNode<ProductCategoriesQuery, ProductCategoriesQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const FetchProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"photos"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<FetchProductQuery, FetchProductQueryVariables>;
export const ExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<ExpensesQuery, ExpensesQueryVariables>;
export const FetchExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<FetchExpenseQuery, FetchExpenseQueryVariables>;
export const SalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<SalesQuery, SalesQueryVariables>;
export const FetchSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<FetchSaleQuery, FetchSaleQueryVariables>;