import { useState } from "react";
import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa6";
import CardStatistics from "../components/company/Dashboard/CardStatistics";
import { GiPayMoney } from "react-icons/gi";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import DateFilter from "../components/company/SearchFilters/DateFilter";
import CustomOffCanvas from "../components/company/CustomOffCanvas";
import ExpensesItem from "../components/company/Expenses/ExpensesItem";
import ExpensesEmpty from "../components/company/Expenses/ExpensesEmpty";

export default function Expenses() {
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
                <p className="mb-2">Today's Expenses</p>
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
                <p className="mb-2">December Expenses</p>
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
                <p className="mb-2">This Year Expenses</p>
                <h6 className="mb-0">34</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between p-4">
              <FaChartArea className="fa-3x text-primary" />
              <div className="ms-3">
                <p className="mb-2">Last Year Expenses</p>
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
                <p className="mb-2">Most Paid Expenses</p>
                <h6 className="mb-0">$1234</h6>
              </div>
            </div>
          </div>
        </div>
      </CardStatistics>

      <div className="container-fluid pt-4">
        <div className="bg-white rounded h-100 p-4 mt-4">
          <h6 className="mb-4">
            <GiPayMoney className="me-3 fs-4" />
            Expenses Record
          </h6>
          <ExpensesEmpty />
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
                <ExpensesItem handleOffCanvasShow={handleOffCanvasShow} />
                <ExpensesItem handleOffCanvasShow={handleOffCanvasShow} />
                <ExpensesItem handleOffCanvasShow={handleOffCanvasShow} />
                <ExpensesItem handleOffCanvasShow={handleOffCanvasShow} />
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CustomOffCanvas
        title="Expense Details"
        showOffCanvas={showOffCanvas}
        handleOffCanvasClose={handleOffCanvasClose}
      >
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Title: Payment of salary</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Category: Salary</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Amount: NGN8,000</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Date: 25/12/2024</small>
            </p>
          </li>
        </ul>
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
        Receipt Attached
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Mary Johnson</small>
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
