import { FaRegCalendarAlt } from "react-icons/fa";

export default function DateFilter() {
  return (
    <>
      <div className="button-container">
        <button type="button" className="btn btn-sm btn-outline-primary">
          Custom period
        </button>
        <button type="button" className="btn btn-sm btn-outline-primary">
          Current week
        </button>
        <button type="button" className="btn btn-sm btn-outline-primary">
          Last Week
        </button>
        <button type="button" className="btn btn-sm btn-outline-primary">
          Current Month
        </button>
        <button type="button" className="btn btn-sm btn-outline-primary">
          Last Month
        </button>
        <button type="button" className="btn btn-sm btn-outline-primary">
          Current year
        </button>
        <button type="button" className="btn btn-sm btn-outline-primary">
          Last year
        </button>
      </div>
      <div className="custom-date">
        <div className="row">
          <div className="col-12 col-sm-6">
            <p className="mb-0">
              <small>From:</small>
            </p>
            <div className="input-group mb-3">
              <span className="input-group-text" id="startdate">
                <FaRegCalendarAlt />
              </span>
              <input
                type="date"
                className="form-control"
                placeholder="Start Date"
                aria-label="startdate"
                aria-describedby="startdate"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <p className="mb-0">
              <small>To:</small>
            </p>
            <div className="input-group mb-3">
              <span className="input-group-text" id="enddate">
                <FaRegCalendarAlt />
              </span>
              <input
                type="date"
                className="form-control"
                placeholder="End Date"
                aria-label="enddate"
                aria-describedby="enddate"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
