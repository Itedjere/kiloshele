import { FaBell } from "react-icons/fa";
import { Link } from "react-router";

export default function NotificationItem() {
  return (
    <>
      <Link to="#" className="dropdown-item">
        <div className="notification-icon">
          <FaBell className="me-lg-2" />
        </div>
        <div className="notification-msg">
          <h6 className="fw-normal mb-0">Profile updated</h6>
          <small>15 minutes ago</small>
        </div>
      </Link>
      <hr className="dropdown-divider" />
    </>
  );
}
