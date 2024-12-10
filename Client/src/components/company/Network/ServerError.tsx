import { FiRefreshCcw } from "react-icons/fi";
import ImageServerDown from "../../../assets/company/img/undraw_server_down_s-4-lk.svg";

export default function ServerError({
  errorMessage,
  url,
}: {
  errorMessage: string;
  url: string;
}) {
  return (
    <div className="row">
      <div className="col-12 text-center">
        <img
          src={ImageServerDown}
          className="img-fluid mb-3"
          width="300"
          alt=""
        />
        <h3>An error occurred</h3>
        <p>An error occurred on our server. {errorMessage}</p>
        <a href={url} className="btn btn-primary">
          <FiRefreshCcw className="me-1" />
          Please Try Again
        </a>
      </div>
    </div>
  );
}
