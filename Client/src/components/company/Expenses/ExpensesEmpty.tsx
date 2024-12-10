import { Link } from "react-router";
import imageAddExpenses from "../../../assets/company/img/undraw_online_payments_re_y8f2.svg";
import { GiPayMoney } from "react-icons/gi";

export default function ExpensesEmpty() {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <img
          src={imageAddExpenses}
          className="img-fluid mb-3"
          width="300"
          alt=""
        />
        <h3>Add New Expenses</h3>
        <p>
          You have not added any expenses yet. Click the button below to add new
          expenses
        </p>
        <Link to="/add-products" className="btn btn-primary">
          <GiPayMoney className="me-1" />
          Add New Expenses
        </Link>
      </div>
    </div>
  );
}
