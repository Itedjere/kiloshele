import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

export default function SalesProductCard() {
  return (
    <div className="card">
      <div className="card-header text-black">1 Plate of egusi soup</div>
      <div className="card-body">
        <small>
          <p className="mb-2">Category: Food</p>
          <p className="mb-2">Quantity Stock: 46</p>
          <p className="mb-2">Cost Price: NGN800</p>
          <p className="mb-2">Selling Price:</p>
          <div className="mb-2">
            <input
              className="form-control form-control-sm"
              type="number"
              placeholder="Selling Price"
              value="1000"
            ></input>
          </div>
          <div className="d-flex quantity-updater">
            <span className="btn btn-primary">
              <AiOutlineMinus />
            </span>
            <span className="text-quantity">12</span>
            <span className="btn btn-primary">
              <AiOutlinePlus />
            </span>
          </div>
        </small>
      </div>
      <div className="card-footer text-end text-body-secondary">
        <button type="button" className="btn btn-danger btn-sm">
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
}
