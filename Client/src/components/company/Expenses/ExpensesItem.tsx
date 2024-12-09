import { BiSolidCategory } from "react-icons/bi";
import { FaRegMoneyBillAlt, FaRegTrashAlt } from "react-icons/fa";
import { FaRegEye, FaRegKeyboard } from "react-icons/fa6";

interface ExpensesItem {
  handleOffCanvasShow: () => void;
}

export default function ExpensesItem({ handleOffCanvasShow }: ExpensesItem) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 text-end">
          <FaRegMoneyBillAlt />
        </div>
        <div className="col-7">
          <p className="text-black m-0">Payment of salary</p>
          <small className="text-secondary">
            <BiSolidCategory /> Salary
          </small>
        </div>
        <div className="col-5 d-flex justify-content-end align-items-center">
          <div className="text-end">
            <p className="fs-6 text-black mb-0">NGN5,000</p>
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
