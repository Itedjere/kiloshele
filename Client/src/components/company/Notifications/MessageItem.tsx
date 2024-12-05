import { Link } from "react-router";
import adminAvatar from "../../../assets/company/img/user.jpg";

export default function MessageItem() {
  return (
    <>
      <Link to="#" className="dropdown-item">
        <div className="d-flex align-items-center">
          <img
            className="rounded-circle"
            src={adminAvatar}
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
          <div className="ms-2">
            <h6 className="fw-normal mb-0">Jhon send you a message</h6>
            <small>15 minutes ago</small>
          </div>
        </div>
      </Link>
      <hr className="dropdown-divider" />
    </>
  );
}
