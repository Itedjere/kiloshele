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
  mediaUrl: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  other_fees: Array<OtherServiceFeesInput>;
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

export type ExpenseStats = {
  __typename?: 'ExpenseStats';
  highestExpenseAmount: Scalars['Float']['output'];
  highestExpenseCategory?: Maybe<Scalars['String']['output']>;
  lastYearExpenses: Scalars['Float']['output'];
  monthExpenses: Scalars['Float']['output'];
  todayExpenses: Scalars['Float']['output'];
  yearExpenses: Scalars['Float']['output'];
};

export type ExpensesPlusCursor = {
  __typename?: 'ExpensesPlusCursor';
  list: Array<Expense>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type ItemSoldInput = {
  cost_price: Scalars['Float']['input'];
  other_fees: Array<OtherServiceFeesInput>;
  product: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  selling_price: Scalars['Float']['input'];
};

export type ItemSoldType = {
  __typename?: 'ItemSoldType';
  _id: Scalars['String']['output'];
  cost_price: Scalars['Float']['output'];
  other_fees: Array<OtherServiceFees>;
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
  deleteExpenseFile: Expense;
  deleteProductFile: Product;
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


export type MutationDeleteExpenseFileArgs = {
  fileUrl: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
};


export type MutationDeleteProductFileArgs = {
  fileUrl: Scalars['String']['input'];
  resourceId: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
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
  mediaUrl: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  other_fees: Array<OtherServiceFees>;
  quantity: Scalars['Int']['output'];
  restock_level: Scalars['Int']['output'];
  selling_price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
  supplier_name: Scalars['String']['output'];
  supplier_phone: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  type: ServiceOrProduct;
};

export type ProductInfoStats = {
  __typename?: 'ProductInfoStats';
  productName?: Maybe<Scalars['String']['output']>;
  totalProfit?: Maybe<Scalars['Int']['output']>;
  totalQuantity?: Maybe<Scalars['Int']['output']>;
};

export type ProductServiceStats = {
  __typename?: 'ProductServiceStats';
  productStats: ProductStats;
  serviceStats: ServiceStats;
};

export type ProductStats = {
  __typename?: 'ProductStats';
  totalInventoryValue: Scalars['Float']['output'];
  totalLowStock: Scalars['Int']['output'];
  totalOutOfStock: Scalars['Int']['output'];
  totalProducts: Scalars['Int']['output'];
};

export type ProductsPlusCursor = {
  __typename?: 'ProductsPlusCursor';
  list: Array<Product>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  expenseOne: Expense;
  expenseStats: ExpenseStats;
  expenses: ExpensesPlusCursor;
  expensesCategories: Array<Scalars['String']['output']>;
  productOne: Product;
  productStats: ProductServiceStats;
  products: ProductsPlusCursor;
  productsCategories: Array<Scalars['String']['output']>;
  saleOne: Sale;
  saleStats: SaleStats;
  sales: SalesPlusCursor;
};


export type QueryExpenseOneArgs = {
  expenseId: Scalars['String']['input'];
};


export type QueryExpensesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductOneArgs = {
  productId: Scalars['String']['input'];
};


export type QueryProductsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySaleOneArgs = {
  saleId: Scalars['String']['input'];
};


export type QuerySalesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
};

export type Sale = {
  __typename?: 'Sale';
  _id: Scalars['String']['output'];
  additional_note: Scalars['String']['output'];
  company: Company;
  createdAt: Scalars['DateTime']['output'];
  customer_name: Scalars['String']['output'];
  customer_phone: Scalars['String']['output'];
  customer_reference: Scalars['String']['output'];
  date: Scalars['DateTime']['output'];
  itemSold: Array<ItemSoldType>;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  staff_assigned: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SaleStats = {
  __typename?: 'SaleStats';
  lowSellingProducts: Array<ProductInfoStats>;
  mostProfitableProducts: Array<ProductInfoStats>;
  topSellingProducts: Array<ProductInfoStats>;
  totalProfitThisMonth?: Maybe<Scalars['Float']['output']>;
  totalProfitToday?: Maybe<Scalars['Float']['output']>;
  totalRevenueThisMonth?: Maybe<Scalars['Float']['output']>;
  totalRevenueToday?: Maybe<Scalars['Float']['output']>;
  totalSalesThisMonth?: Maybe<Scalars['Int']['output']>;
  totalSalesToday?: Maybe<Scalars['Int']['output']>;
};

export type SalesPlusCursor = {
  __typename?: 'SalesPlusCursor';
  list: Array<Sale>;
  nextCursor?: Maybe<Scalars['String']['output']>;
};

export type ServerResponse = {
  __typename?: 'ServerResponse';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export enum ServiceOrProduct {
  Product = 'PRODUCT',
  Service = 'SERVICE'
}

export type ServiceStats = {
  __typename?: 'ServiceStats';
  averageServicePrice: Scalars['Float']['output'];
  servicesWithAdditionalFees: Scalars['Int']['output'];
  totalServices: Scalars['Int']['output'];
};

export type AuthenticationFieldsFragment = { __typename?: 'AuthenticatedCompany', token: string, company: { __typename?: 'Company', _id: string, name: string, username: string, email: string } } & { ' $fragmentName'?: 'AuthenticationFieldsFragment' };

export type ExpenseFieldsFragment = { __typename?: 'Expense', _id: string, title: string, category: string, date: any, amount: number, payment_method: PaymentMethod, payment_status: PaymentStatus, additional_notes: string, mediaUrl: Array<string> } & { ' $fragmentName'?: 'ExpenseFieldsFragment' };

export type ProductFieldsFragment = { __typename?: 'Product', _id: string, name: string, sku: string, description: string, supplier_name: string, supplier_phone: string, tags: Array<string>, category: string, createdAt: any, cost_price: number, selling_price: number, quantity: number, restock_level: number, mediaUrl: Array<string>, type: ServiceOrProduct, other_fees: Array<{ __typename?: 'OtherServiceFees', cost_price: number, duration: string, selling_price: number }> } & { ' $fragmentName'?: 'ProductFieldsFragment' };

export type SaleFieldsFragment = { __typename?: 'Sale', _id: string, customer_name: string, customer_phone: string, customer_reference: string, date: any, payment_method: PaymentMethod, payment_status: PaymentStatus, staff_assigned: string, additional_note: string, itemSold: Array<{ __typename?: 'ItemSoldType', cost_price: number, selling_price: number, quantity: number, _id: string, product: { __typename?: 'Product', _id: string, name: string, category: string, type: ServiceOrProduct }, other_fees: Array<{ __typename?: 'OtherServiceFees', duration: string, cost_price: number, selling_price: number }> }> } & { ' $fragmentName'?: 'SaleFieldsFragment' };

export type SignupCompanyMutationVariables = Exact<{
  signupInfo: Addcompanyinput;
}>;


export type SignupCompanyMutation = { __typename?: 'Mutation', signupCompany: (
    { __typename?: 'AuthenticatedCompany' }
    & { ' $fragmentRefs'?: { 'AuthenticationFieldsFragment': AuthenticationFieldsFragment } }
  ) };

export type LoginCompanyMutationVariables = Exact<{
  loginInfo: Logincompanyinput;
}>;


export type LoginCompanyMutation = { __typename?: 'Mutation', loginCompany: (
    { __typename?: 'AuthenticatedCompany' }
    & { ' $fragmentRefs'?: { 'AuthenticationFieldsFragment': AuthenticationFieldsFragment } }
  ) };

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


export type AddProductMutation = { __typename?: 'Mutation', addProduct: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
  ) };

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

export type UpdateSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
  saleInfo: Addsaleinfo;
}>;


export type UpdateSaleMutation = { __typename?: 'Mutation', updateSale: (
    { __typename?: 'Sale' }
    & { ' $fragmentRefs'?: { 'SaleFieldsFragment': SaleFieldsFragment } }
  ) };

export type DeleteSaleMutationVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type DeleteSaleMutation = { __typename?: 'Mutation', removeSale: { __typename?: 'Sale', _id: string } };

export type DeleteProductResourceMutationVariables = Exact<{
  resourceId: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
}>;


export type DeleteProductResourceMutation = { __typename?: 'Mutation', deleteProductFile: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
  ) };

export type DeleteExpenseResourceMutationVariables = Exact<{
  resourceId: Scalars['String']['input'];
  fileUrl: Scalars['String']['input'];
  resourceType: Scalars['String']['input'];
}>;


export type DeleteExpenseResourceMutation = { __typename?: 'Mutation', deleteExpenseFile: (
    { __typename?: 'Expense' }
    & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
  ) };

export type ExpensesCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpensesCategoriesQuery = { __typename?: 'Query', expensesCategories: Array<string> };

export type ProductCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductCategoriesQuery = { __typename?: 'Query', productsCategories: Array<string> };

export type ProductsQueryVariables = Exact<{
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductsPlusCursor', nextCursor?: string | null, list: Array<(
      { __typename?: 'Product' }
      & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
    )> } };

export type FetchProductQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type FetchProductQuery = { __typename?: 'Query', productOne: (
    { __typename?: 'Product' }
    & { ' $fragmentRefs'?: { 'ProductFieldsFragment': ProductFieldsFragment } }
  ) };

export type ProductStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductStatsQuery = { __typename?: 'Query', productStats: { __typename?: 'ProductServiceStats', productStats: { __typename?: 'ProductStats', totalInventoryValue: number, totalLowStock: number, totalOutOfStock: number, totalProducts: number }, serviceStats: { __typename?: 'ServiceStats', averageServicePrice: number, servicesWithAdditionalFees: number, totalServices: number } } };

export type SaleStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type SaleStatsQuery = { __typename?: 'Query', saleStats: { __typename?: 'SaleStats', totalProfitThisMonth?: number | null, totalProfitToday?: number | null, totalRevenueThisMonth?: number | null, totalRevenueToday?: number | null, totalSalesToday?: number | null, totalSalesThisMonth?: number | null, lowSellingProducts: Array<{ __typename?: 'ProductInfoStats', productName?: string | null, totalQuantity?: number | null }>, topSellingProducts: Array<{ __typename?: 'ProductInfoStats', productName?: string | null, totalQuantity?: number | null }>, mostProfitableProducts: Array<{ __typename?: 'ProductInfoStats', productName?: string | null, totalProfit?: number | null }> } };

export type ExpensesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type ExpensesQuery = { __typename?: 'Query', expenses: { __typename?: 'ExpensesPlusCursor', nextCursor?: string | null, list: Array<(
      { __typename?: 'Expense' }
      & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
    )> } };

export type FetchExpenseQueryVariables = Exact<{
  expenseId: Scalars['String']['input'];
}>;


export type FetchExpenseQuery = { __typename?: 'Query', expenseOne: (
    { __typename?: 'Expense' }
    & { ' $fragmentRefs'?: { 'ExpenseFieldsFragment': ExpenseFieldsFragment } }
  ) };

export type ExpenseStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type ExpenseStatsQuery = { __typename?: 'Query', expenseStats: { __typename?: 'ExpenseStats', todayExpenses: number, monthExpenses: number, yearExpenses: number, lastYearExpenses: number, highestExpenseAmount: number, highestExpenseCategory?: string | null } };

export type SalesQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type SalesQuery = { __typename?: 'Query', sales: { __typename?: 'SalesPlusCursor', nextCursor?: string | null, list: Array<(
      { __typename?: 'Sale' }
      & { ' $fragmentRefs'?: { 'SaleFieldsFragment': SaleFieldsFragment } }
    )> } };

export type FetchSaleQueryVariables = Exact<{
  saleId: Scalars['String']['input'];
}>;


export type FetchSaleQuery = { __typename?: 'Query', saleOne: (
    { __typename?: 'Sale' }
    & { ' $fragmentRefs'?: { 'SaleFieldsFragment': SaleFieldsFragment } }
  ) };

export const AuthenticationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthenticationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedCompany"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<AuthenticationFieldsFragment, unknown>;
export const ExpenseFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<ExpenseFieldsFragment, unknown>;
export const ProductFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<ProductFieldsFragment, unknown>;
export const SaleFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<SaleFieldsFragment, unknown>;
export const SignupCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignupCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signupInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDCOMPANYINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signupCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signupInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthenticationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthenticationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedCompany"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<SignupCompanyMutation, SignupCompanyMutationVariables>;
export const LoginCompanyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCompany"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LOGINCOMPANYINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginCompany"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthenticationFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthenticationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthenticatedCompany"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<LoginCompanyMutation, LoginCompanyMutationVariables>;
export const AddExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddExpenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDEXPENSEINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<AddExpensesMutation, AddExpensesMutationVariables>;
export const UpdateExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDEXPENSEINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}}},{"kind":"Argument","name":{"kind":"Name","value":"expenseInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<UpdateExpenseMutation, UpdateExpenseMutationVariables>;
export const DeleteExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeExpense"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const AddProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDPRODUCTINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<AddProductMutation, AddProductMutationVariables>;
export const UpdateProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDPRODUCTINPUT"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}},{"kind":"Argument","name":{"kind":"Name","value":"productInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProduct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteProductMutation, DeleteProductMutationVariables>;
export const AddSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDSALEINFO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<AddSalesMutation, AddSalesMutationVariables>;
export const UpdateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ADDSALEINFO"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}}},{"kind":"Argument","name":{"kind":"Name","value":"saleInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const DeleteSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteSaleMutation, DeleteSaleMutationVariables>;
export const DeleteProductResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProductResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProductFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fileUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<DeleteProductResourceMutation, DeleteProductResourceMutationVariables>;
export const DeleteExpenseResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteExpenseResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fileUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteExpenseFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"resourceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceId"}}},{"kind":"Argument","name":{"kind":"Name","value":"fileUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fileUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"resourceType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"resourceType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<DeleteExpenseResourceMutation, DeleteExpenseResourceMutationVariables>;
export const ExpensesCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpensesCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expensesCategories"}}]}}]} as unknown as DocumentNode<ExpensesCategoriesQuery, ExpensesCategoriesQueryVariables>;
export const ProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productsCategories"}}]}}]} as unknown as DocumentNode<ProductCategoriesQuery, ProductCategoriesQueryVariables>;
export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
export const FetchProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"productId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_name"}},{"kind":"Field","name":{"kind":"Name","value":"supplier_phone"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"restock_level"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode<FetchProductQuery, FetchProductQueryVariables>;
export const ProductStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProductStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalInventoryValue"}},{"kind":"Field","name":{"kind":"Name","value":"totalLowStock"}},{"kind":"Field","name":{"kind":"Name","value":"totalOutOfStock"}},{"kind":"Field","name":{"kind":"Name","value":"totalProducts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"serviceStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"averageServicePrice"}},{"kind":"Field","name":{"kind":"Name","value":"servicesWithAdditionalFees"}},{"kind":"Field","name":{"kind":"Name","value":"totalServices"}}]}}]}}]}}]} as unknown as DocumentNode<ProductStatsQuery, ProductStatsQueryVariables>;
export const SaleStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SaleStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lowSellingProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"topSellingProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"totalQuantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mostProfitableProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"totalProfit"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalProfitThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"totalProfitToday"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenueThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"totalRevenueToday"}},{"kind":"Field","name":{"kind":"Name","value":"totalSalesToday"}},{"kind":"Field","name":{"kind":"Name","value":"totalSalesThisMonth"}}]}}]}}]} as unknown as DocumentNode<SaleStatsQuery, SaleStatsQueryVariables>;
export const ExpensesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Expenses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<ExpensesQuery, ExpensesQueryVariables>;
export const FetchExpenseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchExpense"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"expenseId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"expenseId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExpenseFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExpenseFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Expense"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"additional_notes"}},{"kind":"Field","name":{"kind":"Name","value":"mediaUrl"}}]}}]} as unknown as DocumentNode<FetchExpenseQuery, FetchExpenseQueryVariables>;
export const ExpenseStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ExpenseStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"expenseStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"todayExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"monthExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"yearExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"lastYearExpenses"}},{"kind":"Field","name":{"kind":"Name","value":"highestExpenseAmount"}},{"kind":"Field","name":{"kind":"Name","value":"highestExpenseCategory"}}]}}]}}]} as unknown as DocumentNode<ExpenseStatsQuery, ExpenseStatsQueryVariables>;
export const SalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"list"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"nextCursor"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<SalesQuery, SalesQueryVariables>;
export const FetchSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saleOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"saleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"saleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SaleFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SaleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Sale"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"itemSold"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"other_fees"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"cost_price"}},{"kind":"Field","name":{"kind":"Name","value":"selling_price"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer_name"}},{"kind":"Field","name":{"kind":"Name","value":"customer_phone"}},{"kind":"Field","name":{"kind":"Name","value":"customer_reference"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"payment_method"}},{"kind":"Field","name":{"kind":"Name","value":"payment_status"}},{"kind":"Field","name":{"kind":"Name","value":"staff_assigned"}},{"kind":"Field","name":{"kind":"Name","value":"additional_note"}}]}}]} as unknown as DocumentNode<FetchSaleQuery, FetchSaleQueryVariables>;