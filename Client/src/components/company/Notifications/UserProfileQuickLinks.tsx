import { SyntheticEvent } from "react";
import { FaCog, FaPowerOff, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAuthenticatedContext } from "../Contexts/AuthenticationContext";
import { toast } from "react-toastify";

export default function UserProfileQuickLinks() {
  const { logoutUser } = useAuthenticatedContext();
  const navigate = useNavigate();

  const logOut = (e: SyntheticEvent) => {
    e.preventDefault();
    logoutUser();
    toast.success("You logged out successfully");
    navigate("/login");
  };
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
        <a href="#" className="dropdown-item" onClick={logOut}>
          <FaPowerOff />
          Log Out
        </a>
      </div>
    </>
  );
}
