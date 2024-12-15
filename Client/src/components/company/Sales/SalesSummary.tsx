import { SalesSummaryType } from "../../../utitlities/typesUtils";
import { formatPrice } from "../../../utitlities/utils";

export default function SalesSummary({
  salesSummary: { total_quantity, total_sales, potential_profit },
}: {
  salesSummary: SalesSummaryType;
}) {
  return (
    <ul className="list-group bg-white ">
      <li className="list-group-item">
        <p className="mb-0 text-black">
          <small>Total Quantity: {total_quantity}</small>
        </p>
      </li>
      <li className="list-group-item">
        <p className="mb-0 text-black">
          <small>Total Sales: {formatPrice(total_sales)}</small>
        </p>
      </li>
      <li className="list-group-item">
        <p className="mb-0 text-black">
          <small>Potential Profit: {formatPrice(potential_profit)}</small>
        </p>
      </li>
    </ul>
  );
}
