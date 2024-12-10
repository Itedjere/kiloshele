import { Link } from "react-router";
import imageAddProducts from "../../../assets/company/img/undraw_web_shopping_re_owap.svg";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";

export default function ProductsEmpty() {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <img
          src={imageAddProducts}
          className="img-fluid mb-3"
          width="300"
          alt=""
        />
        <h3>Add Product or Service</h3>
        <p>
          You have not added any product or service yet. Click the button below
          to add new product or service
        </p>
        <Link to="/add-products" className="btn btn-primary">
          <MdOutlineEmojiFoodBeverage className="me-1" />
          Add Product Or Service
        </Link>
      </div>
    </div>
  );
}
