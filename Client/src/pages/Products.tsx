import { useState } from "react";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import CardStatistics from "../components/company/Dashboard/CardStatistics";
import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa6";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import ProductItem from "../components/company/Products/ProductItem";
import CustomOffCanvas from "../components/company/CustomOffCanvas";

export default function Products() {
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
                <p className="mb-2">Total Products</p>
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
                <p className="mb-2">Low Stock Items</p>
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
                <p className="mb-2">Out of Stock</p>
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
                <p className="mb-2">Total Revenue</p>
                <h6 className="mb-0">$1234</h6>
              </div>
            </div>
          </div>
        </div>
      </CardStatistics>
      <div className="container-fluid pt-4">
        <div className="bg-white rounded h-100 p-4 mt-4">
          <h6 className="mb-4">
            <MdOutlineEmojiFoodBeverage className="me-3 fs-4" />
            Products & Services
          </h6>
          <div className="row">
            <SearchFilter />
          </div>
          <div className="row">
            <div className="col-12">
              <ul className="list-group list-group-flush">
                <ProductItem handleOffCanvasShow={handleOffCanvasShow} />
                <ProductItem handleOffCanvasShow={handleOffCanvasShow} />
                <ProductItem handleOffCanvasShow={handleOffCanvasShow} />
                <ProductItem handleOffCanvasShow={handleOffCanvasShow} />
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CustomOffCanvas
        title="Product & Service Details"
        showOffCanvas={showOffCanvas}
        handleOffCanvasClose={handleOffCanvasClose}
      >
        Basic Product Details
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <strong>Name:</strong> 1 Plate of rice and chicken
          </li>
          <li className="list-group-item">
            <strong>Category:</strong> Food
          </li>
          <li className="list-group-item">
            <strong>SKU Code:</strong> SKU45236
          </li>
        </ul>
        Inventory & Financial Detaiils
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <strong>Stock Quantity:</strong> 300
          </li>
          <li className="list-group-item">
            <strong>Level to restock:</strong> 10
          </li>
          <li className="list-group-item">
            <strong>Selling Price:</strong> NGN45,000
          </li>
          <li className="list-group-item">
            <strong>Cost Price:</strong> NGN45,000
          </li>
        </ul>
        Other Fees
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <div className="row">
              <div className="col-sm-12 col-md-4">2 Hours</div>
              <div className="col-sm-12 col-md-4">
                <strong>Cost Price: </strong>NGN10,000
              </div>
              <div className="col-sm-12 col-md-4">
                <strong>Selling Price: </strong>
                NGN12,000
              </div>
            </div>
          </li>
          <li className="list-group-item bg-transparent">
            <div className="row">
              <div className="col-sm-12 col-md-4">2 Hours</div>
              <div className="col-sm-12 col-md-4">
                <strong>Cost Price: </strong>NGN10,000
              </div>
              <div className="col-sm-12 col-md-4">
                <strong>Selling Price: </strong>
                NGN12,000
              </div>
            </div>
          </li>
          <li className="list-group-item bg-transparent">
            <div className="row">
              <div className="col-sm-12 col-md-4">2 Hours</div>
              <div className="col-sm-12 col-md-4">
                <strong>Cost Price: </strong>NGN10,000
              </div>
              <div className="col-sm-12 col-md-4">
                <strong>Selling Price: </strong>
                NGN12,000
              </div>
            </div>
          </li>
        </ul>
        Brief Description
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p>This is a lovely product</p>
          </li>
        </ul>
        Supplier Info
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <strong>Name:</strong> Blessing Osagie
          </li>
          <li className="list-group-item">
            <strong>Phone:</strong> 08152056325
          </li>
        </ul>
        Tags
        <ul className="list-group mb-3">
          <li className="list-group-item">Red, Green, Small, Large, Rough</li>
        </ul>
        Photos
        <ul className="list-group mb-3">
          <li className="list-group-item">Photos</li>
        </ul>
      </CustomOffCanvas>
    </>
  );
}
