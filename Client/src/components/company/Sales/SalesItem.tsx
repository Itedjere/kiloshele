import { BiSolidCategory } from "react-icons/bi";
import { FaCalendarAlt, FaRegTrashAlt } from "react-icons/fa";
import { FaBook, FaRegEye, FaRegKeyboard } from "react-icons/fa6";
import { SalesType } from "../../../utitlities/typesUtils";
import moment from "moment";
import { formatPrice } from "../../../utitlities/utils";
import { Link } from "react-router";

interface SalesItemProps {
  sale: SalesType;
  handleOffCanvasShow: (sale: SalesType) => void;
  handleShowDeleteModal: (sale: SalesType) => void;
}

export default function SalesItem({
  handleOffCanvasShow,
  sale,
  handleShowDeleteModal,
}: SalesItemProps) {
  // Calculate total sales and quantity
  let totalSales: number = 0;
  let totalQuantity: number = 0;
  sale.itemSold.forEach(({ selling_price, quantity }) => {
    totalSales += selling_price * quantity;
    totalQuantity += quantity;
  });
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 text-end">
          <FaBook />
        </div>
        <div className="col-7">
          <p className="text-black m-0">
            {sale.itemSold[0].product.name}{" "}
            {sale.itemSold.length > 1 && (
              <small className="text-secondary">
                +{sale.itemSold.length - 1} more items
              </small>
            )}
          </p>
          <p className="m-0">
            <small className="text-secondary d-flex align-items-center">
              <BiSolidCategory /> {sale.itemSold[0].product.category}
            </small>
          </p>
          <p className="m-0">
            <small className="text-secondary d-flex align-items-center">
              <FaCalendarAlt /> {moment(sale.date).format("MMMM Do YYYY")}
            </small>
          </p>
        </div>
        <div className="col-5 d-flex justify-content-end align-items-center">
          <div className="text-end">
            <p className="fs-6 text-black mb-0">{formatPrice(totalSales)}</p>
            <small className="text-secondary">Quantity: {totalQuantity}</small>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-between">
          <Link
            to={`/sales/${sale._id}/edit`}
            className="btn btn-sm btn-primary"
          >
            <FaRegKeyboard className="me-1" />
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={() => handleOffCanvasShow(sale)}
          >
            <FaRegEye className="me-1" />
            Details
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => handleShowDeleteModal(sale)}
          >
            <FaRegTrashAlt className="me-1" />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
