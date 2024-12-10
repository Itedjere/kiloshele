import { Link } from "react-router";
import imageUnderConstruction from "../assets/company/img/undraw_under_construction_-46-pa.svg";
import DashboardStatisticsCards from "../components/company/Dashboard/DashboardStatisticsCards";

export default function ComingSoon() {
  return (
    <>
      <DashboardStatisticsCards />
      <div className="container-fluid pt-4">
        <div className="bg-white rounded h-100 p-4 mt-4">
          <div className="row">
            <div className="col-sm-12 text-center">
              <img
                src={imageUnderConstruction}
                className="img-fluid mb-3"
                width="300"
                alt=""
              />
              <h3>Coming Soon</h3>
              <p>
                We are building something very exciting. We will let you know
                when it is ready
              </p>
              <Link to="/" className="btn btn-primary">
                Go To Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
