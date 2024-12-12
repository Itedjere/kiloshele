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

type Pintura = {
  file: File;
  data: {};
};

export interface UFileInterface extends File {
  preview?: string | null;
  pintura?: Pintura;
}
