import { BiSolidCategory } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlateWheat, FaRegEye, FaRegKeyboard } from "react-icons/fa6";
import { ProductType } from "../../../utitlities/typesUtils";
import { formatPrice } from "../../../utitlities/utils";
import { Link } from "react-router";

interface ProductItemProps {
  product: ProductType;
  handleOffCanvasShow: (product: ProductType) => void;
  handleShowDeleteModal: (product: ProductType) => void;
}

export default function ProductItem({
  product,
  handleOffCanvasShow,
  handleShowDeleteModal,
}: ProductItemProps) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 text-end">
          <FaPlateWheat />
        </div>
        <div className="col-7">
          <p className="text-black m-0">{product.name}</p>
          <small className="text-secondary">
            <BiSolidCategory /> {product.category}
          </small>
        </div>
        <div className="col-5 d-flex justify-content-end align-items-center">
          <div className="text-end">
            <p className="fs-6 text-black mb-0">
              {formatPrice(product.selling_price)}
            </p>
            <small className="text-secondary">
              CP: {formatPrice(product.cost_price)}
            </small>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-between">
          <Link
            to={`products/${product._id}/edit`}
            className="btn btn-sm btn-primary"
          >
            <FaRegKeyboard className="me-1" />
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={() => handleOffCanvasShow(product)}
          >
            <FaRegEye className="me-1" />
            Details
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => handleShowDeleteModal(product)}
          >
            <FaRegTrashAlt className="me-1" />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
