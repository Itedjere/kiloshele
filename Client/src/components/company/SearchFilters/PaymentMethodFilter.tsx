import {
  filterValueType,
  PaymentMethodType,
} from "../../../utitlities/typesUtils";
import { paymentMethodsUtils } from "../../../utitlities/utils";

interface PaymentMethodFilterProps {
  payment_method: string;
  handleUpdatePaymentMethodFilter: (filter: filterValueType) => void;
}

export default function PaymentMethodFilter({
  payment_method,
  handleUpdatePaymentMethodFilter,
}: PaymentMethodFilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleUpdatePaymentMethodFilter({
      paymentMethod: event.target.value as PaymentMethodType | "",
    });
  };
  return (
    <div className="form-floating mb-3">
      <select
        className={`form-select`}
        id="floatingSelect"
        aria-label="Floating label select example"
        value={payment_method}
        onChange={handleChange}
      >
        <option value="">Click Here</option>
        {paymentMethodsUtils.map((paymentMethod, index) => {
          const key = Object.keys(paymentMethod)[0];
          const value = paymentMethod[key];
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
