import { FaCog, FaPowerOff, FaUser } from "react-icons/fa";

export default function UserProfileQuickLinks() {
  return (
    <>
      <div className="dropdown-menu topbar-dropdown-menu dropdown-menu-end bg-white border-0 shadow rounded m-0">
        <a href="#" className="dropdown-item">
          <FaUser />
          My Profile
        </a>
        <hr className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <FaCog />
          Settings
        </a>
        <hr className="dropdown-divider" />
        <a href="#" className="dropdown-item">
          <FaPowerOff />
          Log Out
        </a>
      </div>
    </>
  );
}
