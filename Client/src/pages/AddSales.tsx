import { FaCalendarAlt, FaRegMoneyBillAlt, FaStickyNote } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import { GiConverseShoe } from "react-icons/gi";
import { FaPlus, FaUsers, FaUserTag } from "react-icons/fa6";
import CustomToggleButton from "../components/company/CustomToggleButton";
import { GrPowerReset } from "react-icons/gr";
import SalesProductCard from "../components/company/Sales/SalesProductCard";
import SalesServiceCard from "../components/company/Sales/SalesServiceCard";
import SalesSummary from "../components/company/Sales/SalesSummary";
import ProductDropdownSelectMenu from "../components/company/DropdownSelectMenus/ProductDropdownSelectMenu";

export default function AddSales() {
  return (
    <div className="container-fluid pt-4 px-lg-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-white rounded h-100 p-2">
            <h6 className="mb-4">
              <FaRegMoneyBillAlt className="me-3 fs-4" />
              Add Sales
            </h6>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <p className="mb-0 text-black">
                    <GiConverseShoe className="me-2 fs-5" />
                    <span>Product Details</span>
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-sm-12 col-lg-6 mb-3">
                      <ProductDropdownSelectMenu />
                      <button type="button" className="btn btn-sm">
                        <small>Search Product by SKU Number</small>
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 col-md-4 mb-3">
                      <SalesProductCard />
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                      <SalesProductCard />
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                      <SalesProductCard />
                    </div>
                    <div className="col-sm-12 col-md-4 mb-3">
                      <SalesServiceCard />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 mb-3">
                      <SalesSummary />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <CustomToggleButton eventKey="1" direction="next">
                      Next
                    </CustomToggleButton>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <p className="mb-0 text-black">
                    <FaCalendarAlt className="me-2 fs-5" />
                    <span>Date, Payment Method and Status</span>
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <small>
                      Change date if not today. Also payment method and status
                    </small>
                  </p>
                  <div className="row">
                    <div className="col-sm-12 col-lg-4">
                      <div className="form-floating mb-3">
                        <input
                          type="date"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Sales Date"
                        />
                        <label htmlFor="floatingInput">Sales Date</label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                        >
                          <option selected>Click Here</option>
                          <option value="1">Card</option>
                          <option value="2">Cash</option>
                          <option value="3">Bank Transfer</option>
                        </select>
                        <label htmlFor="floatingSelect">
                          Select Payment method
                        </label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                        >
                          <option selected>Click Here</option>
                          <option value="1">Paid</option>
                          <option value="2">Pending</option>
                          <option value="3">Partially Paid</option>
                        </select>
                        <label htmlFor="floatingSelect">
                          Select Payment Status
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="0" direction="previous">
                        Previous
                      </CustomToggleButton>
                      <CustomToggleButton eventKey="2" direction="next">
                        Next
                      </CustomToggleButton>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <p className="mb-0 text-black">
                    <FaUserTag className="me-2 fs-5" />
                    <span>Staff Assigned(Optional)</span>
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <small>Select your staff that did this transaction</small>
                  </p>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                        >
                          <option selected>Click Here</option>
                          <option value="1">Paid</option>
                          <option value="2">Pending</option>
                          <option value="3">Partially Paid</option>
                        </select>
                        <label htmlFor="floatingSelect">Select Staff</label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="1" direction="previous">
                        Previous
                      </CustomToggleButton>
                      <CustomToggleButton eventKey="3" direction="next">
                        Next
                      </CustomToggleButton>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  <p className="mb-0 text-black">
                    <FaUsers className="me-2 fs-5" />
                    <span>Customer Details(Optional)</span>
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <small>
                      Enter the customer name, phone number and notes for future
                      reference
                    </small>
                  </p>
                  <div className="row">
                    <div className="col-sm-12 col-lg-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Customer Name"
                        />
                        <label htmlFor="floatingInput">Customer Name</label>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="Customer Phone number"
                        />
                        <label htmlFor="floatingInput">
                          Customer Phone number
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                          style={{ height: "150px" }}
                        ></textarea>
                        <label htmlFor="floatingTextarea">
                          Notes for future reference
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="2" direction="previous">
                        Previous
                      </CustomToggleButton>
                      <CustomToggleButton eventKey="4" direction="next">
                        Next
                      </CustomToggleButton>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  <p className="mb-0 text-black">
                    <FaStickyNote className="me-2 fs-5" />
                    <span>Additional Notes (Optional)</span>
                  </p>
                </Accordion.Header>
                <Accordion.Body>
                  <p>
                    <small>
                      Add any additional notes for reference (Optional)
                    </small>
                  </p>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <textarea
                          className="form-control"
                          placeholder="Leave a comment here"
                          id="floatingTextarea"
                          style={{ height: "150px" }}
                        ></textarea>
                        <label htmlFor="floatingTextarea">
                          Additional Notes
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="3" direction="previous">
                        Previous
                      </CustomToggleButton>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="row">
              <div className="col-12 mt-3">
                <button type="button" className="btn btn-primary m-2">
                  <FaPlus className="me-2" />
                  Save Sale
                </button>
                <button type="button" className="btn btn-outline-secondary m-2">
                  <GrPowerReset className="me-2" />
                  Reset Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
