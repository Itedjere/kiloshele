import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";
import { Item_SoldType } from "../../../utitlities/typesUtils";
import { formatPrice } from "../../../utitlities/utils";

interface SalesProductCardProps {
  product: Item_SoldType;
  handleItemSoldPriceChangeOnTyping: (
    value: string,
    product: Item_SoldType
  ) => void;
  handleItemSoldQuantityChange: (
    changeType: "INCREMENT" | "DECREMENT",
    itemSold: Item_SoldType
  ) => void;
  handleRemoveItemSold: (itemSold: Item_SoldType) => void;
}

export default function SalesProductCard({
  product,
  handleItemSoldPriceChangeOnTyping,
  handleItemSoldQuantityChange,
  handleRemoveItemSold,
}: SalesProductCardProps) {
  // Usage in Input
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemSold: Item_SoldType
  ) => {
    handleItemSoldPriceChangeOnTyping(event.target.value, itemSold);
  };

  return (
    <div className="card">
      <div className="card-header text-black">{product.product.name}</div>
      <div className="card-body">
        <small>
          <p className="mb-2">Category: {product.product.category}</p>
          <p className="mb-2">Quantity Stock: {product.quantity}</p>
          <p className="mb-2">Cost Price: {formatPrice(product.cost_price)}</p>
          <p className="mb-2">Selling Price:</p>
          <div className="mb-2">
            <input
              className="form-control form-control-sm"
              type="number"
              placeholder="Selling Price"
              value={product.selling_price}
              onChange={(event) => handleChange(event, product)}
            ></input>
          </div>
          <div className="d-flex quantity-updater">
            <span
              className="btn btn-primary"
              onClick={() => handleItemSoldQuantityChange("DECREMENT", product)}
            >
              <AiOutlineMinus />
            </span>
            <span className="text-quantity">{product.quantity}</span>
            <span
              className="btn btn-primary"
              onClick={() => handleItemSoldQuantityChange("INCREMENT", product)}
            >
              <AiOutlinePlus />
            </span>
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
