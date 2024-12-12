import { FaTrash } from "react-icons/fa6";
import { OtherServiceFeeFormDataType } from "../../../utitlities/typesUtils";

interface OtherServiceFeesProps {
  otherFees: OtherServiceFeeFormDataType[];
  handleRemoveOtherServiceFee: (serviceFeeId: number | undefined) => void;
}

export default function OtherServiceFees({
  otherFees,
  handleRemoveOtherServiceFee,
}: OtherServiceFeesProps) {
  return (
    <ul className="list-group">
      {otherFees.map((fees) => (
        <li className="list-group-item bg-transparent">
          <div className="row">
            <div className="col-sm-12 col-md-3">{fees.duration}</div>
            <div className="col-sm-12 col-md-3">
              <strong>Cost Price: </strong>
              NGN{fees.cost_price}
            </div>
            <div className="col-sm-12 col-md-3">
              <strong>Selling Price: </strong>
              NGN{fees.selling_price}
            </div>
            <div className="col-sm-12 col-md-3 d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleRemoveOtherServiceFee(fees.id)}
              >
                <FaTrash />
                Remove
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
