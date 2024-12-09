import { BiSolidCategory } from "react-icons/bi";
import { FaCalendarAlt, FaRegTrashAlt } from "react-icons/fa";
import { FaBook, FaRegEye, FaRegKeyboard } from "react-icons/fa6";

interface SalesItemProps {
  handleOffCanvasShow: () => void;
}

export default function SalesItem({ handleOffCanvasShow }: SalesItemProps) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 text-end">
          <FaBook />
        </div>
        <div className="col-7">
          <p className="text-black m-0">1 Plate of rice and chicken</p>
          <p className="m-0">
            <small className="text-secondary d-flex align-items-center">
              <BiSolidCategory /> Food
            </small>
          </p>
          <p className="m-0">
            <small className="text-secondary d-flex align-items-center">
              <FaCalendarAlt /> 07/12/2024
            </small>
          </p>
        </div>
        <div className="col-5 d-flex justify-content-end align-items-center">
          <div className="text-end">
            <p className="fs-6 text-black mb-0">NGN5,000</p>
            <small className="text-secondary">Quantity: 1000</small>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-between">
          <button type="button" className="btn btn-sm btn-primary">
            <FaRegKeyboard className="me-1" />
            Edit
          </button>
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={handleOffCanvasShow}
          >
            <FaRegEye className="me-1" />
            Details
          </button>
          <button type="button" className="btn btn-sm btn-danger">
            <FaRegTrashAlt className="me-1" />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
