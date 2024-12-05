import { FaRegMoneyBillAlt } from "react-icons/fa";
import { FaUserPlus, FaUsers } from "react-icons/fa6";
import { GiConverseShoe, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { MdOutlineCoffeeMaker } from "react-icons/md";
import { SlCalculator } from "react-icons/sl";
import { Link } from "react-router";

export default function QuickLinks() {
  return (
    <div className="container-fluid pt-4 px-4 mt-4">
      <div className="row g-4">
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <MdOutlineCoffeeMaker className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Add Products</h6>
                  <p>To Add all your products and services</p>
                </div>
                <div className="actions">
                  <Link to="/add-products" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <GiConverseShoe className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Manage Products</h6>
                  <p>To View, edit or delete your products or services</p>
                </div>
                <div className="actions">
                  <Link to="/all-products" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <FaRegMoneyBillAlt className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Add Sales</h6>
                  <p>To Add new sales</p>
                </div>
                <div className="actions">
                  <Link to="/add-sales" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <GiReceiveMoney className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Manage Sales</h6>
                  <p>To View, edit or delete your sales</p>
                </div>
                <div className="actions">
                  <Link to="/all-sales" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <GiPayMoney className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Add Expenses</h6>
                  <p>To Add new Expenses</p>
                </div>
                <div className="actions">
                  <Link to="/add-expenses" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <SlCalculator className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Manage Expenses</h6>
                  <p>To View, edit or delete your expenses</p>
                </div>
                <div className="actions">
                  <Link to="/all-expenses" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <FaUserPlus className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Add Staff</h6>
                  <p>To add new staffs</p>
                </div>
                <div className="actions">
                  <Link to="/add-staffs" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <FaUsers className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">Manage Staff</h6>
                  <p>To View, edit or remove your staffs</p>
                </div>
                <div className="actions">
                  <Link to="/all-staffs" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="text-center">
                <div className="mb-4 icon">
                  <IoStatsChart className="fa-3x text-primary" />
                </div>
                <div className="mb-4">
                  <h6 className="mb-0">View Chart</h6>
                  <p>To View Charts of your business performance</p>
                </div>
                <div className="actions">
                  <Link to="/charts" className="btn btn-primary w-100">
                    Click Here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
