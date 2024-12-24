import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa6";
import CardStatistics from "../Statistics/StatisticSlider";

export default function DashboardStatisticsCards() {
  return (
    <CardStatistics>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between p-4">
            <FaChartLine className="fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Today Sale</p>
              <h6 className="mb-0">$1234</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between p-4">
            <FaChartBar className="fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Total Sale</p>
              <h6 className="mb-0">$1234</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between p-4">
            <FaChartArea className="fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Today Revenue</p>
              <h6 className="mb-0">$1234</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between p-4">
            <FaChartPie className="fa-3x text-primary" />
            <div className="ms-3">
              <p className="mb-2">Total Revenue</p>
              <h6 className="mb-0">$1234</h6>
            </div>
          </div>
        </div>
      </div>
    </CardStatistics>
  );
}
