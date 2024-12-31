import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import DateFilter from "../SearchFilters/DateFilter";
import { GrPowerReset } from "react-icons/gr";
import { FaEye, FaMoneyBillTransfer, FaMoneyCheck } from "react-icons/fa6";
import { FaCalendarAlt, FaUserCog } from "react-icons/fa";
import { MdPayments } from "react-icons/md";

interface SalesFilterProps {
  showFilter: boolean;
  handleToggleFilter: () => void;
}

export default function SalesFilter({
  showFilter,
  handleToggleFilter,
}: SalesFilterProps) {
  return (
    <Offcanvas show={showFilter} onHide={handleToggleFilter} placement="top">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter Sales</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <Tab.Container id="left-tabs-example" defaultActiveKey="date">
                <Row>
                  <Col sm={12} md={3}>
                    <Nav variant="pills" className="flex-column bg-light mb-2">
                      <Nav.Item>
                        <Nav.Link eventKey="date">
                          <FaCalendarAlt className="me-2" />
                          Date Range
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="payment_status">
                          <FaMoneyBillTransfer className="me-2" />
                          Payment Status
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="payment_method">
                          <FaMoneyCheck className="me-2" />
                          Payment Method
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="staff_assigned">
                          <FaUserCog className="me-2" />
                          Staff Assigned
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="amount_range">
                          <MdPayments className="me-2" />
                          Sales Amount Range
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={12} md={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="date">
                        <h5>
                          <FaCalendarAlt className="me-2" />
                          Date
                        </h5>
                        <DateFilter />
                      </Tab.Pane>
                      <Tab.Pane eventKey="payment_status">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Payment Status
                        </h5>
                        <div className="form-floating mb-3">
                          <select
                            className={`form-select`}
                            id="floatingSelect"
                            aria-label="Floating label select example"
                          >
                            <option value="">Click Here</option>
                            <option value="1">Paid</option>
                            <option value="2">Pending</option>
                            <option value="3">Partially Paid</option>
                          </select>
                          <label htmlFor="floatingSelect">
                            Select Payment Status
                          </label>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="payment_method">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Payment Method
                        </h5>
                        <div className="form-floating">
                          <select
                            className={`form-select`}
                            id="floatingSelect"
                            aria-label="label for payment method"
                          >
                            <option value="">Click Here</option>
                            <option value="CARD">Card</option>
                            <option value="CASH">Cash</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                          </select>
                          <label htmlFor="floatingSelect">
                            Select Payment method
                          </label>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="staff_assigned">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Staff Assigned
                        </h5>
                        <div className="form-floating">
                          <select
                            className={`form-select`}
                            id="floatingSelect"
                            aria-label="label for payment method"
                          >
                            <option value="">Click Here</option>
                            <option value="CARD">Card</option>
                            <option value="CASH">Cash</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                          </select>
                          <label htmlFor="floatingSelect">
                            Select Staff Assigned
                          </label>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="amount_range">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Sale Amount Range
                        </h5>
                        <div className="row">
                          <div className="col-sm-6 col-12">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Minimum Sale Amount"
                              />
                              <label htmlFor="floatingInput">
                                Minimum Amount
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-6 col-12">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Maximum Sale Amount"
                              />
                              <label htmlFor="floatingInput">
                                Maximum Amount
                              </label>
                            </div>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                    <div className="mt-3">
                      <button
                        className="btn btn-outline-secondary m-2"
                        type="button"
                      >
                        <GrPowerReset className="me-2" />
                        Reset
                      </button>
                      <button type="button" className="btn btn-primary m-2">
                        <FaEye className="me-2" />
                        Show 1000 Results
                      </button>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          </div>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
