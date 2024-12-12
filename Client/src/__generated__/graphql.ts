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
  customer_note?: InputMaybe<Scalars['String']['input']>;
  customer_phone?: InputMaybe<Scalars['String']['input']>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  price: Scalars['Float']['input'];
  product: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
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
  additional_notes?: Maybe<Scalars['String']['output']>;
  amount: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  mediaUrl: Array<Scalars['String']['output']>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  other_fees: Array<OtherServiceFees>;
  photos: Array<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  restock_level?: Maybe<Scalars['Int']['output']>;
  selling_price: Scalars['Float']['output'];
  sku?: Maybe<Scalars['String']['output']>;
  supplier_name?: Maybe<Scalars['String']['output']>;
  supplier_phone?: Maybe<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  type: ServiceOrProduct;
};

export type Query = {
  __typename?: 'Query';
  expenses: Array<Expense>;
  expensesCategories: Array<Scalars['String']['output']>;
  products: Array<Product>;
  productsCategories: Array<Scalars['String']['output']>;
  sales: Array<Sale>;
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['String']['output'];
  additional_note?: Maybe<Scalars['String']['output']>;
  company: Company;
  customer_name?: Maybe<Scalars['String']['output']>;
  customer_note?: Maybe<Scalars['String']['output']>;
  customer_phone?: Maybe<Scalars['String']['output']>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  price: Scalars['Float']['output'];
  product: Product;
  quantity?: Maybe<Scalars['String']['output']>;
  staff_assigned?: Maybe<Scalars['String']['output']>;
};

export enum ServiceOrProduct {
  Product = 'PRODUCT',
  Service = 'SERVICE'
}

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


export type AddExpensesMutation = { __typename?: 'Mutation', addExpense: { __typename?: 'Expense', category: string } };

export type AddProductMutationVariables = Exact<{
  productInfo: Addproductinput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'Product', category: string } };

export type ExpensesCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpensesCategoriesQuery = { __typename?: 'Query', expensesCategories: Array<string> };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { __typename?: 'Query', productsCategories: Array<string> };


export const SignupCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDCOMPANYINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<SignupCompanyMutation, SignupCompanyMutationVariables>;
export const LoginCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LOGINCOMPANYINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<LoginCompanyMutation, LoginCompanyMutationVariables>;
export const AddExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDEXPENSEINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<AddExpensesMutation, AddExpensesMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDPRODUCTINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const ExpensesCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpensesCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expensesCategories"}}]}}]} as unknown as DocumentNode<ExpensesCategoriesQuery, ExpensesCategoriesQueryVariables>;
export const ProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsCategories"}}]}}]} as unknown as DocumentNode<ProductCategoriesQuery, ProductCategoriesQueryVariables>;