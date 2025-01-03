import { FaRegCalendarAlt } from "react-icons/fa";
import { filterValueType } from "../../../utitlities/typesUtils";
import { useState } from "react";
import moment from "moment";

interface DateFilterProps {
  startDate: string;
  endDate: string;
  handleUpdateDateFilter: (filter: filterValueType) => void;
}

export default function DateFilter({
  startDate,
  endDate,
  handleUpdateDateFilter,
}: DateFilterProps) {
  const [active, setActive] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentDate = { [event.target.name]: event.target.value };
    handleUpdateDateFilter({
      dateRange: {
        startDate,
        endDate,
        ...currentDate,
      },
    });
  };

  const updateDateFields = (startDate: string, endDate: string) => {
    handleUpdateDateFilter({
      dateRange: {
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  const handleDateRange = (range: string) => {
    let start: string;
    let end: string;
    let activeButton: string = "";

    switch (range) {
      case "currentWeek":
        start = moment().startOf("week").format("YYYY-MM-DD");
        end = moment().endOf("week").format("YYYY-MM-DD");
        activeButton = "currentWeek";
        break;
      case "lastWeek":
        start = moment()
          .subtract(1, "week")
          .startOf("week")
          .format("YYYY-MM-DD");
        end = moment().subtract(1, "week").endOf("week").format("YYYY-MM-DD");
        activeButton = "lastWeek";
        break;
      case "currentMonth":
        start = moment().startOf("month").format("YYYY-MM-DD");
        end = moment().endOf("month").format("YYYY-MM-DD");
        activeButton = "currentMonth";
        break;
      case "lastMonth":
        start = moment()
          .subtract(1, "month")
          .startOf("month")
          .format("YYYY-MM-DD");
        end = moment().subtract(1, "month").endOf("month").format("YYYY-MM-DD");
        activeButton = "lastMonth";
        break;
      case "currentYear":
        start = moment().startOf("year").format("YYYY-MM-DD");
        end = moment().endOf("year").format("YYYY-MM-DD");
        activeButton = "currentYear";
        break;
      case "lastYear":
        start = moment()
          .subtract(1, "year")
          .startOf("year")
          .format("YYYY-MM-DD");
        end = moment().subtract(1, "year").endOf("year").format("YYYY-MM-DD");
        activeButton = "lastYear";
        break;
      default:
        start = "";
        end = "";
        activeButton = "custom";
    }

    updateDateFields(start, end);
    setActive(activeButton);
  };

  return (
    <>
      <div className="button-container">
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "custom" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("")}
        >
          Custom period
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "currentWeek" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("currentWeek")}
        >
          Current week
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "lastWeek" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("lastWeek")}
        >
          Last Week
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "currentMonth" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("currentMonth")}
        >
          Current Month
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "lastMonth" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("lastMonth")}
        >
          Last Month
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "currentYear" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("currentYear")}
        >
          Current year
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-outline-primary ${
            active === "lastYear" ? "active text-white" : ""
          }`}
          onClick={() => handleDateRange("lastYear")}
        >
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
                name="startDate"
                value={startDate}
                onChange={handleChange}
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
                name="endDate"
                value={endDate}
                onChange={handleChange}
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
