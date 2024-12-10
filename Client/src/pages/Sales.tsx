import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa6";
import CardStatistics from "../components/company/Dashboard/CardStatistics";
import { LuNotepadText } from "react-icons/lu";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import DateFilter from "../components/company/SearchFilters/DateFilter";
import SalesItem from "../components/company/Sales/SalesItem";
import CustomOffCanvas from "../components/company/CustomOffCanvas";
import { useState } from "react";
import SalesEmpty from "../components/company/Sales/SalesEmpty";

export default function Sales() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleOffCanvasClose = () => setShowOffCanvas(false);
  const handleOffCanvasShow = () => setShowOffCanvas(true);
  return (
    <>
      <CardStatistics>
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between p-4">
              <FaChartLine className="fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Today's Sales</p>
                <h6 className="mb-0">234</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between p-4">
              <FaChartBar className="fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">December Sales</p>
                <h6 className="mb-0">12</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between p-4">
              <FaChartArea className="fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Today Units Sold</p>
                <h6 className="mb-0">34</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between p-4">
              <FaChartPie className="fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Most Sold Product</p>
                <h6 className="mb-0">$1234</h6>
              </div>
            </div>
          </div>
        </div>
      </CardStatistics>

      <div className="container-fluid pt-4">
        <div className="bg-white rounded h-100 p-4 mt-4">
          <h6 className="mb-4">
            <LuNotepadText className="me-3 fs-4" />
            Sales Record
          </h6>
          <SalesEmpty />
          <div className="row">
            <SearchFilter />
          </div>
          <div className="row">
            <div className="col-12">
              <DateFilter />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ul className="list-group list-group-flush">
                <SalesItem handleOffCanvasShow={handleOffCanvasShow} />
                <SalesItem handleOffCanvasShow={handleOffCanvasShow} />
                <SalesItem handleOffCanvasShow={handleOffCanvasShow} />
                <SalesItem handleOffCanvasShow={handleOffCanvasShow} />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CustomOffCanvas
        title="Sales Details"
        showOffCanvas={showOffCanvas}
        handleOffCanvasClose={handleOffCanvasClose}
      >
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Total Quantity Sold: 25</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Total Revenue Made: NGN25,000</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Total Profit Made: NGN8,000</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Date: 25/12/2024</small>
            </p>
          </li>
        </ul>
        Product Detaiils
        <div className="card mb-3">
          <div className="card-header text-black">
            <small>1 Plate of egusi soup</small>
          </div>
          <div className="card-body">
            <small>
              <p className="mb-2">Category: Food</p>
              <p className="mb-2">Quantity Sold: 46</p>
              <p className="mb-2">Cost Price: NGN800</p>
              <p className="mb-2">Selling Price: NGN1200</p>
            </small>
          </div>
          <div className="card-footer text-end text-body-secondary">
            <small>Profit Made: NGN400</small>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header text-black">
            <small>1 Plate of egusi soup</small>
          </div>
          <div className="card-body">
            <small>
              <p className="mb-2">Category: Food</p>
              <p className="mb-2">Quantity Sold: 46</p>
              <p className="mb-2">Cost Price: NGN800</p>
              <p className="mb-2">Selling Price: NGN1200</p>
            </small>
          </div>
          <div className="card-footer text-end text-body-secondary">
            <small>Profit Made: NGN400</small>
          </div>
        </div>
        <div className="card mb-3">
          <div className="card-header text-black">
            <small>1 Plate of egusi soup</small>
          </div>
          <div className="card-body">
            <small>
              <p className="mb-2">Category: Food</p>
              <p className="mb-2">Quantity Sold: 46</p>
              <p className="mb-2">Cost Price: NGN800</p>
              <p className="mb-2">Selling Price: NGN1200</p>
            </small>
          </div>
          <div className="card-footer text-end text-body-secondary">
            <small>Profit Made: NGN400</small>
          </div>
        </div>
        Payment Details
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Payment Method: Cash</small>
            </p>
          </li>
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Payment Status: Pending</small>
            </p>
          </li>
        </ul>
        Staff Assigned
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Mary Johnson</small>
            </p>
          </li>
        </ul>
        Customer Info
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>Name: Blessing Osagie</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>Phone: 08152056325</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>Note: That brother wey get big head</small>
            </p>
          </li>
        </ul>
        Additional Notes
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>This is a lovely product</small>
            </p>
          </li>
        </ul>
      </CustomOffCanvas>
    </>
  );
}
