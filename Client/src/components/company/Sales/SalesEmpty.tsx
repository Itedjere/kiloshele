import { Link } from "react-router";
import imageAddSales from "../../../assets/company/img/undraw_add_notes_re_ln36.svg";
import { LuNotepadText } from "react-icons/lu";

export default function SalesEmpty() {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <img
          src={imageAddSales}
          className="img-fluid mb-3"
          width="300"
          alt=""
        />
        <h3>Add New Sales</h3>
        <p>
          You have not added any sales yet. Click the button below to add new
          sales
        </p>
        <Link to="/add-sales" className="btn btn-primary">
          <LuNotepadText className="me-1" />
          Add New Sales
        </Link>
      </div>
    </div>
  );
}
