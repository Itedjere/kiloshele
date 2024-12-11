import { SyntheticEvent, useState } from "react";
import {
  FaBuilding,
  FaChartBar,
  FaFileAlt,
  FaLaptop,
  FaTachometerAlt,
  FaTh,
} from "react-icons/fa";
import adminAvatar from "../../../assets/company/img/user.jpg";
import { Link, NavLink, useNavigate } from "react-router";
import { IoSettings } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import { useAdminLayoutContext } from "../Contexts/AdminLayoutContext";
import { useAuthenticatedContext } from "../Contexts/AuthenticationContext";
import { toast } from "react-toastify";

export default function Sidebar() {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const { sidebarVisible } = useAdminLayoutContext();
  const { logoutUser } = useAuthenticatedContext();
  const navigate = useNavigate();

  const logOut = (e: SyntheticEvent) => {
    e.preventDefault();
    logoutUser();
    toast.success("You logged out successfully");
    navigate("/login");
  };

  const handleSetActiveMenu = (menu: string) => {
    setActiveMenu(menu === activeMenu ? "" : menu);
  };

  return (
    <div className={`sidebar pe-4 pb-3 ${sidebarVisible ? "open" : ""}`}>
      <nav className="navbar bg-light navbar-light">
        <Link to="/" className="navbar-brand mx-4 mb-3">
          <h3 className="text-primary">
            <FaBuilding className="me-2" />
            KILOSHELE
          </h3>
        </Link>
        <div className="d-flex align-items-center ms-4 mb-4">
          <div className="position-relative">
            <img
              className="rounded-circle"
              src={adminAvatar}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
          </div>
          <div className="ms-3">
            <h6 className="mb-0">Jhon Doe</h6>
            <span>Admin</span>
          </div>
        </div>
        <div className="navbar-nav w-100">
          <div className="nav-category">HOME</div>
          <NavLink to="/" className="nav-item nav-link">
            <FaTachometerAlt className="me-2" />
            Dashboard
          </NavLink>
          <NavLink to="/charts" className="nav-item nav-link">
            <FaChartBar className="me-2" />
            Charts
          </NavLink>
          <div className="nav-category">SALES</div>
          <div
            className={`nav-item dropdown ${
              activeMenu === "sales" ? "show" : ""
            }`}
          >
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              onClick={() => handleSetActiveMenu("sales")}
            >
              <FaLaptop className="me-2" />
              Manage Sales
              <SlArrowDown className="dropdown-arrow" />
            </Link>
            <div className="dropdown-menu bg-transparent border-0">
              <NavLink to="/add-sales" className="dropdown-item">
                Add Sales
              </NavLink>
              <NavLink to="all-sales" className="dropdown-item">
                All Sales
              </NavLink>
            </div>
          </div>
          <div className="nav-category">PRODUCTS</div>
          <div
            className={`nav-item dropdown ${
              activeMenu === "products" ? "show" : ""
            }`}
          >
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              onClick={() => handleSetActiveMenu("products")}
            >
              <FaFileAlt className="me-2" />
              Manage Products
              <SlArrowDown className="dropdown-arrow" />
            </Link>
            <div className="dropdown-menu bg-transparent border-0">
              <NavLink to="/add-products" className="dropdown-item">
                Add Product / Service
              </NavLink>
              <NavLink to="/all-products" className="dropdown-item">
                All Products / Services
              </NavLink>
            </div>
          </div>
          <div className="nav-category">EXPENSES</div>
          <div
            className={`nav-item dropdown ${
              activeMenu === "expenses" ? "show" : ""
            }`}
          >
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              onClick={() => handleSetActiveMenu("expenses")}
            >
              <FaTh className="me-2" />
              Manage Expenses
              <SlArrowDown className="dropdown-arrow" />
            </Link>
            <div className="dropdown-menu bg-transparent border-0">
              <NavLink to="/add-expenses" className="dropdown-item">
                Add Expenses
              </NavLink>
              <NavLink to="all-expenses" className="dropdown-item">
                All Expenses
              </NavLink>
            </div>
          </div>
          <div className="nav-category">SETTINGS</div>
          <div
            className={`nav-item dropdown ${
              activeMenu === "settings" ? "show" : ""
            }`}
          >
            <Link
              to="#"
              className="nav-link dropdown-toggle"
              onClick={() => handleSetActiveMenu("settings")}
            >
              <IoSettings className="me-2" />
              Manage Settings
              <SlArrowDown className="dropdown-arrow" />
            </Link>
            <div className="dropdown-menu bg-transparent border-0">
              <NavLink to="/add-staffs" className="dropdown-item">
                Add Staffs
              </NavLink>
              <NavLink to="/all-staffs" className="dropdown-item">
                All Staffs
              </NavLink>
              <NavLink to="/company-details" className="dropdown-item">
                Company Details
              </NavLink>
              <NavLink to="/change-password" className="dropdown-item">
                Change Password
              </NavLink>
              <a href="#" className="dropdown-item" onClick={logOut}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
