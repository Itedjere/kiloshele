import ImagePageLoading from "../../../assets/company/img/Infinity@1x-2.7s-200px-200px.svg";

export default function PageLoading() {
  return (
    <div className="container-fluid position-relative bg-white d-flex p-0">
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <img
            src={ImagePageLoading}
            className="img-fluid"
            width="150"
            alt=""
          />
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}
