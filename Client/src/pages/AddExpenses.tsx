import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { GiPayMoney } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import CustomToggleButton from "../components/company/CustomToggleButton";
import { FaReceipt, FaRegCalendarAlt } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import SelectDropdown from "../components/company/SelectDropdown";
import AddCategoryModal from "../components/company/Modals/AddCategoryModal";
import { FaPlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";

export default function AddExpenses() {
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState("Click To Choose Category"); // For displaying selected item
  const handleFilteredItems = (searchTerm: string) => {
    const items = ["Rent", "Utilities", "Supplies", "Transportation", "Salary"];
    if (searchTerm.length === 0) {
      return setFilteredItems([]);
    }

    setFilteredItems(
      items.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  const handleShowCategoryModalVisibility = (show: boolean): void => {
    setShowCategoryModal(show);
  };
  return (
    <>
      <div className="container-fluid pt-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-white rounded h-100 p-2">
              <h6 className="mb-4">
                <GiPayMoney className="me-3 fs-3" />
                Add Expense
              </h6>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <p className="mb-0 text-black">
                      <TbMoneybag className="me-2 fs-5" />
                      <span>Expense Details</span>
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <div className="col-sm-12 col-lg-4">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Title/Description"
                          />
                          <label htmlFor="floatingInput">
                            Title/Description
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-4">
                        <div className="form-floating mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingInput"
                            placeholder="Amount"
                          />
                          <label htmlFor="floatingInput">Amount</label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-lg-4">
                        <SelectDropdown
                          filteredItems={filteredItems}
                          handleSelectedItem={(item) => setSelectedItem(item)}
                          handleFilteredItems={handleFilteredItems}
                        >
                          <small>Category</small>
                          <p className="mb-0">{selectedItem}</p>
                        </SelectDropdown>
                        <small>
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() =>
                              handleShowCategoryModalVisibility(true)
                            }
                          >
                            Add New Category
                          </button>
                        </small>
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
                      <FaRegCalendarAlt className="me-2 fs-5" />
                      <span>Date, Payment Method and Status</span>
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p>
                      <small>
                        Change date if expenses was not done today. Also payment
                        method and status
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
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="0" direction="previous">
                        Previous
                      </CustomToggleButton>
                      <CustomToggleButton eventKey="2" direction="next">
                        Next
                      </CustomToggleButton>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <p className="mb-0 text-black">
                      <FaReceipt className="me-2 fs-5" />
                      <span>Receipt Attachment (Optional)</span>
                    </p>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div className="row">
                      <div className="col-12"></div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="1" direction="previous">
                        Previous
                      </CustomToggleButton>
                      <CustomToggleButton eventKey="3" direction="next">
                        Next
                      </CustomToggleButton>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>
                    <p className="mb-0 text-black">
                      <TfiWrite className="me-2 fs-5" />
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
                    </div>
                    <div className="d-flex justify-content-between">
                      <CustomToggleButton eventKey="2" direction="previous">
                        Previous
                      </CustomToggleButton>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <div className="row">
                <div className="col-12 mt-3">
                  <button type="button" className="btn btn-primary m-2">
                    <FaPlus className="me-2" />
                    Save Expenses
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary m-2"
                  >
                    <GrPowerReset className="me-2" />
                    Reset Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryModal
        showCategoryModal={showCategoryModal}
        handleShowCategoryModalVisibility={handleShowCategoryModalVisibility}
      />
    </>
  );
}
