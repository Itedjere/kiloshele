import {
  filterValueType,
  PaymentStatusType,
} from "../../../utitlities/typesUtils";
import { paymentStatusUtils } from "../../../utitlities/utils";

interface PaymentStatusFilterProps {
  payment_status: string;
  handleUpdatedPaymentStatusFilter: (filter: filterValueType) => void;
}

export default function PaymentStatusFilter({
  payment_status,
  handleUpdatedPaymentStatusFilter,
}: PaymentStatusFilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleUpdatedPaymentStatusFilter({
      paymentStatus: event.target.value as PaymentStatusType | "",
    });
  };
  return (
    <div className="form-floating mb-3">
      <select
        className={`form-select`}
        id="floatingSelect"
        aria-label="Floating label select example"
        value={payment_status}
        onChange={handleChange}
      >
        <option value="">Click Here</option>
        {paymentStatusUtils.map((paymentStatus, index) => {
          const key = Object.keys(paymentStatus)[0];
          const value = paymentStatus[key];
          return (
            <option value={key} key={index}>
              {value}
            </option>
          );
        })}
      </select>
      <label htmlFor="floatingSelect">Select Payment Status</label>
    </div>
  );
}
