import { FaCalculator, FaCartPlus, FaCogs } from "react-icons/fa";
import { FaPlateWheat } from "react-icons/fa6";
import { NavLink } from "react-router";

export default function BottomNavigation() {
  return (
    <div className="bottom-navigation shadow d-block d-lg-none">
      <div className="row">
        <div className="col-3">
          <NavLink to="/all-products">
            <div className="d-flex flex-column">
              <div className="icon text-center">
                <FaPlateWheat className="fa-2x" />
              </div>
              <div className="descr text-center">
                <p>Products</p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-3">
          <NavLink to="/all-sales">
            <div className="d-flex flex-column">
              <div className="icon text-center">
                <FaCartPlus className="fa-2x" />
              </div>
              <div className="descr text-center">
                <p>Sales</p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-3">
          <NavLink to="/all-expenses">
            <div className="d-flex flex-column">
              <div className="icon text-center">
                <FaCalculator className="fa-2x" />
              </div>
              <div className="descr text-center">
                <p>Expenses</p>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="col-3">
          <NavLink to="/settings">
            <div className="d-flex flex-column">
              <div className="icon text-center">
                <FaCogs className="fa-2x" />
              </div>
              <div className="descr text-center">
                <p>Account</p>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
