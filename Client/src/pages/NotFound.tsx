import { Link } from "react-router";
import imageNotFound from "../assets/company/img/undraw_empty_re_opql.svg";

export default function NotFound() {
  return (
    <div className="container-fluid bg-white">
      <div
        className="row h-100 align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-sm-12 col-md-6 text-center">
          <img
            src={imageNotFound}
            className="img-fluid mb-3"
            width="300"
            alt=""
          />
          <h3>Page Not Found</h3>
          <p>The page you are looking for does not exists</p>
          <Link to="/" className="btn btn-primary">
            Go To Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
