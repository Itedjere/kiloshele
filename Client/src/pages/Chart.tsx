import LineChart from "../components/company/Charts/LineChart";
import MultiLineChart from "../components/company/Charts/MultiLineChart";

export default function Chart() {
  return (
    <div className="container-fluid pt-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-light rounded h-100">
            <h6 className="mb-4">Single Line Chart</h6>
            <LineChart />
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-light rounded h-100">
            <h6 className="mb-4">Single Line Chart</h6>
            <MultiLineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
