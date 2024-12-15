import { BiSolidCategory } from "react-icons/bi";
import {
  FaCalendarAlt,
  FaRegMoneyBillAlt,
  FaRegTrashAlt,
} from "react-icons/fa";
import { FaRegEye, FaRegKeyboard } from "react-icons/fa6";
import { ExpensesType } from "../../../utitlities/typesUtils";
import { formatPrice } from "../../../utitlities/utils";
import { Link } from "react-router";

interface ExpensesItem {
  expense: ExpensesType;
  handleOffCanvasShow: (expense: ExpensesType) => void;
  handleRemoveExpense: (expense: ExpensesType) => void;
}

export default function ExpensesItem({
  expense,
  handleOffCanvasShow,
  handleRemoveExpense,
}: ExpensesItem) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-12 text-end">
          <FaRegMoneyBillAlt />
        </div>
        <div className="col-7">
          <p className="text-black m-0">{expense.title}</p>
          <small className="text-secondary">
            <BiSolidCategory /> {expense.category}
          </small>
        </div>
        <div className="col-5 d-flex justify-content-end align-items-center">
          <div className="text-end">
            <p className="fs-6 text-black mb-0">
              {formatPrice(expense.amount)}
            </p>
            <small className="text-secondary">
              <FaCalendarAlt /> {expense.date}
            </small>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-between">
          <Link
            to={`/expenses/${expense._id}/edit`}
            className="btn btn-sm btn-primary"
          >
            <FaRegKeyboard className="me-1" />
            Edit
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={() => handleOffCanvasShow(expense)}
          >
            <FaRegEye className="me-1" />
            Details
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => handleRemoveExpense(expense)}
          >
            <FaRegTrashAlt className="me-1" />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
