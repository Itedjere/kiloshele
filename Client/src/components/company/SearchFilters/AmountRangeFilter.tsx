import { filterValueType } from "../../../utitlities/typesUtils";

interface AmountRangeFilterProps {
  minimumAmt: string;
  maximumAmt: string;
  handleUpdateAmountRangeFilter: (filter: filterValueType) => void;
}

export default function AmountRangeFilter({
  minimumAmt,
  maximumAmt,
  handleUpdateAmountRangeFilter,
}: AmountRangeFilterProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentRange = {
      [event.target.name]: event.target.value,
    };

    handleUpdateAmountRangeFilter({
      saleRange: {
        maximumAmount: maximumAmt,
        minimumAmount: minimumAmt,
        ...currentRange,
      },
    });
  };

  return (
    <div className="row">
      <div className="col-sm-6 col-12">
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Minimum Sale Amount"
            name="minimumAmount"
            min={0}
            value={minimumAmt}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Minimum Amount</label>
        </div>
      </div>
      <div className="col-sm-6 col-12">
        <div className="form-floating mb-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Maximum Sale Amount"
            name="maximumAmount"
            max={0}
            value={maximumAmt}
            onChange={handleChange}
          />
          <label htmlFor="floatingInput">Maximum Amount</label>
        </div>
      </div>
    </div>
  );
}
