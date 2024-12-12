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
  id?: number;
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
