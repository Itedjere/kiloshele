import { FaTrash } from "react-icons/fa6";

export default function SalesServiceCard() {
  return (
    <div className="card">
      <div className="card-header text-black">Hair cut for men</div>
      <div className="card-body">
        <small>
          <p className="mb-2">Category: Haircut</p>
          <p className="mb-2">Cost Price: NGN800</p>
          <p className="mb-2">Selling Price:</p>
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="mb-2">
                <input
                  className="form-control form-control-sm"
                  type="number"
                  placeholder="Selling Price"
                  value="1000"
                ></input>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <select
                className="form-select form-select-sm mb-3"
                aria-label=".form-select-sm example"
              >
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </small>
      </div>
      <div className="card-footer text-end text-body-secondary">
        <button type="button" className="btn btn-danger btn-sm">
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
}
