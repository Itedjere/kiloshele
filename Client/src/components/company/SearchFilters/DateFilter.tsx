import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function DateFilter() {
  const [openCustomDate, setOpenCustomDate] = useState(false);
  return (
    <>
      <div className="button-container">
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => setOpenCustomDate(!openCustomDate)}
        >
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
      <Collapse in={openCustomDate}>
        <div className="custom-date pt-3">
          <div className="row">
            <div className="col-12 col-sm-6">
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
      </Collapse>
    </>
  );
}
