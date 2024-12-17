import { useState } from "react";
import { FaBars, FaBell, FaEnvelope, FaHome } from "react-icons/fa";
import MessageItem from "../Notifications/MessageItem";
import { Link } from "react-router";
import NotificationItem from "../Notifications/NotificationItem";
import UserProfileQuickLinks from "../Notifications/UserProfileQuickLinks";
import { useAdminLayoutContext } from "../Contexts/AdminLayoutContext";
import { IoIosArrowDown } from "react-icons/io";
import adminAvatar from "../../../assets/company/img/user.jpg";

export default function TopNavigation() {
  const { setSidebarVisible } = useAdminLayoutContext();
  const [notificationDropdown, setNotificationDropdown] = useState<string>("");

  const handleNotificationDropdown = (notifi: string) => {
    setNotificationDropdown((notificationDropdown) =>
      notifi === notificationDropdown ? "" : notifi
    );
  };

  return (
    <nav className="navbar navbar-expand bg-light navbar-light sticky-top px-4 py-0">
      <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
        <h2 className="text-primary mb-0">
          <FaHome />
        </h2>
      </a>
      <a
        href="#"
        className="sidebar-toggler flex-shrink-0"
        onClick={() => setSidebarVisible((sidebarVisible) => !sidebarVisible)}
      >
        <FaBars />
      </a>
      <form className="d-none d-md-flex ms-4">
        <input
          className="form-control border-0"
          type="search"
          placeholder="Search"
        />
      </form>
      <div className="navbar-nav align-items-center ms-auto">
        <div
          className={`nav-item dropdown ${
            notificationDropdown === "message" ? "show" : ""
          }`}
        >
          <a
            href="#"
            className="nav-link dropdown-toggle"
            onClick={() => handleNotificationDropdown("message")}
          >
            <FaEnvelope className="me-lg-2" />
            <span className="d-none d-lg-inline-flex ms-3">Message</span>
            <IoIosArrowDown className="dropdown-arrow" />
          </a>
          <div className="dropdown-menu dropdown-menu-end bg-white border-0 shadow rounded m-0">
            <MessageItem />
            <MessageItem />
            <MessageItem />
            <Link to="#" className="dropdown-item">
              See all 5 messages
            </Link>
          </div>
        </div>
        <div
          className={`nav-item dropdown ${
            notificationDropdown === "notification" ? "show" : ""
          }`}
        >
          <a
            href="#"
            className="nav-link dropdown-toggle"
            onClick={() => handleNotificationDropdown("notification")}
          >
            <FaBell className="me-lg-2" />
            <span className="d-none d-lg-inline-flex ms-3">Notification</span>
            <IoIosArrowDown className="dropdown-arrow" />
          </a>
          <div className="dropdown-menu dropdown-notifications dropdown-menu-end bg-white border-0 shadow rounded m-0">
            <NotificationItem />
            <NotificationItem />
            <NotificationItem />
            <Link to="#" className="dropdown-item text-center">
              See all 17 notifications
            </Link>
          </div>
        </div>
        <div
          className={`nav-item dropdown ${
            notificationDropdown === "settings" ? "show" : ""
          }`}
        >
          <a
            href="#"
            className="nav-link dropdown-toggle"
            onClick={() => handleNotificationDropdown("settings")}
          >
            <img
              className="rounded-circle me-lg-2"
              src={adminAvatar}
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
            <span className="d-none d-lg-inline-flex ms-3">John Doe</span>
            <IoIosArrowDown className="dropdown-arrow" />
          </a>
          <UserProfileQuickLinks />
        </div>
      </div>
    </nav>
  );
}
