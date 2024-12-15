import { FaTrash } from "react-icons/fa6";
import { ItemSoldType } from "../../../utitlities/typesUtils";
import { useEffect, useState } from "react";
import { formatPrice } from "../../../utitlities/utils";

interface SalesProductCardProps {
  product: ItemSoldType;
  handleItemSoldPriceChangeOnTyping: (
    value: string,
    product: ItemSoldType
  ) => void;
  handleRemoveItemSold: (itemSold: ItemSoldType) => void;
}

export default function SalesServiceCard({
  product,
  handleItemSoldPriceChangeOnTyping,
  handleRemoveItemSold,
}: SalesProductCardProps) {
  const [selectedOption, setSelectedOption] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(parseInt(event.target.value));
  };

  const handlePriceChangeByTyping = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemSold: ItemSoldType
  ) => {
    handleItemSoldPriceChangeOnTyping(event.target.value, itemSold);
    setSelectedOption(parseInt(event.target.value) || 0);
  };

  useEffect(() => {
    setSelectedOption(product.selling_price);
  }, []);

  return (
    <div className="card">
      <div className="card-header text-black">{product.name}</div>
      <div className="card-body">
        <small>
          <p className="mb-2">Category: {product.category}</p>
          <p className="mb-2">Cost Price: {formatPrice(product.cost_price)}</p>
          <p className="mb-2">Selling Price:</p>
          <div className="row">
            <div className="col-sm-12">
              <div className="mb-2">
                <input
                  className="form-control form-control-sm"
                  type="number"
                  placeholder="Selling Price"
                  value={selectedOption}
                  onChange={(event) =>
                    handlePriceChangeByTyping(event, product)
                  }
                ></input>
              </div>
            </div>
            {product.other_fees.length > 0 && (
              <div className="col-sm-12">
                <select
                  className="form-select form-select-sm mb-3"
                  aria-label=".form-select-sm example"
                  value={selectedOption}
                  onChange={handleChange}
                >
                  {product.other_fees.map((other_fees) => (
                    <option value={other_fees.selling_price}>
                      {`${other_fees.duration} - ${formatPrice(
                        other_fees.selling_price
                      )}`}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </small>
      </div>
      <div className="card-footer text-end text-body-secondary">
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => handleRemoveItemSold(product)}
        >
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
}
