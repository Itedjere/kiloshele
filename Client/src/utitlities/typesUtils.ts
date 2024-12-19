export type CompanyType = {
  _id: string;
  name: string;
  username: string;
  email: string;
};

export type AddExpenseFormDataType = {
  title: string;
  amount: number;
  date: string;
  payment_method: "CARD" | "CASH" | "BANK_TRANSFER";
  payment_status: "PAID" | "PENDING" | "PARTIALLY_PAID";
  additional_notes?: string;
};

export type ExpensesType = AddExpenseFormDataType & {
  _id: string;
  category: string;
  mediaUrl: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type AddProductsFormDataType = {
  name: string;
  sku?: string;
  quantity: number;
  restock_level?: number;
  cost_price: number;
  selling_price: number;
  description?: string;
  supplier_name?: string;
  supplier_phone?: string;
  tags?: string;
};

export type OtherServiceFeeFormDataType = {
  id?: string;
  duration: string;
  cost_price: number;
  selling_price: number;
};

type Pintura = {
  file: File;
  data: {};
};

export interface UFileInterface extends File {
  preview?: string | null;
  pintura?: Pintura;
}

export type FileDropzoneProps = {
  files: UFileInterface[];
  accept: Record<string, string[]>; // Accepted file types
  maxFiles: number; // Max number of files allowed
  setFiles: React.Dispatch<React.SetStateAction<UFileInterface[]>>;
};

export type ProductType = {
  _id: string;
  name: string;
  type: "PRODUCT" | "SERVICE";
  category: string;
  quantity: number;
  restock_level: number;
  cost_price: number;
  selling_price: number;
  other_fees: OtherServiceFeeFormDataType[];
  description: string;
  supplier_name: string;
  supplier_phone: string;
  tags: string[];
  photos: string[];
  sku: string;
};

export type ItemSoldType = ProductType & {
  quantity_sold: number;
};

export type SalesSummaryType = {
  total_quantity: number;
  total_sales: number;
  potential_profit: number;
};

export type ItemsToSellType = {
  product: string;
  quantity: number;
  cost_price: number;
  selling_price: number;
};

export type AddSalesFormDataType = {
  date: string;
  payment_method: "CARD" | "CASH" | "BANK_TRANSFER";
  payment_status: "PAID" | "PENDING" | "PARTIALLY_PAID";
  staff_assigned?: string;
  customer_name?: string;
  customer_phone?: string;
  customer_reference?: string;
  additional_note?: string;
};

export type SalesProductType = {
  name: string;
  category: string;
  type: "PRODUCT" | "SERVICE";
};

export type Item_SoldType = {
  _id: string;
  product: SalesProductType;
  quantity: number;
  cost_price: number;
  selling_price: number;
  other_fees?: OtherServiceFeeFormDataType[];
};

export type SalesType = AddSalesFormDataType & {
  _id: string;
  date: string;
  payment_method: "CARD" | "CASH" | "BANK_TRANSFER";
  payment_status: "PAID" | "PENDING" | "PARTIALLY_PAID";
  staff_assigned: string;
  customer_name: string;
  customer_phone: string;
  customer_reference: string;
  additional_note: string;
  itemSold: Item_SoldType[];
};
