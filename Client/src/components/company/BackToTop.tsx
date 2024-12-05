import { FaArrowUpLong } from "react-icons/fa6";
import { Link } from "react-router";

export default function BackToTop() {
  return (
    <Link to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
      <FaArrowUpLong />
    </Link>
  );
}
