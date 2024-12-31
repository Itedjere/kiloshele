import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Col from "react-bootstrap/Col";
import { GrPowerReset } from "react-icons/gr";
import { FaEye, FaMoneyBillTransfer, FaMoneyCheck } from "react-icons/fa6";
import { FaCalendarAlt, FaUserCog } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import DateFilter from "../SearchFilters/DateFilter";
import PaymentMethodFilter from "../SearchFilters/PaymentMethodFilter";
import PaymentStatusFilter from "../SearchFilters/PaymentStatusFilter";
import AmountRangeFilter from "../SearchFilters/AmountRangeFilter";
import StaffAssignedFilter from "../SearchFilters/StaffAssignedFilter";
import { useFilterContext } from "../Contexts/FilterContext";
import { filterValueType } from "../../../utitlities/typesUtils";

interface SalesFilterProps {
  showFilter: boolean;
  handleToggleFilter: () => void;
}

export default function SalesFilter({
  showFilter,
  handleToggleFilter,
}: SalesFilterProps) {
  const {
    filters: { saleFilter },
    handleSetSaleFilter,
    resetFilters,
  } = useFilterContext();

  const handleSalesFilter = (filter: filterValueType) => {
    handleSetSaleFilter(filter);
  };

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
                        <DateFilter
                          startDate={saleFilter?.dateRange?.startDate || ""}
                          endDate={saleFilter?.dateRange?.endDate || ""}
                          handleSalesFilter={handleSalesFilter}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="payment_status">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Payment Status
                        </h5>
                        <PaymentStatusFilter
                          payment_status={saleFilter?.paymentStatus || ""}
                          handleSalesFilter={handleSalesFilter}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="payment_method">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Payment Method
                        </h5>
                        <PaymentMethodFilter
                          payment_method={saleFilter?.paymentMethod || ""}
                          handleSalesFilter={handleSalesFilter}
                        />
                      </Tab.Pane>
                      <Tab.Pane eventKey="staff_assigned">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Staff Assigned
                        </h5>
                        <StaffAssignedFilter />
                      </Tab.Pane>
                      <Tab.Pane eventKey="amount_range">
                        <h5>
                          <FaMoneyBillTransfer className="me-2" />
                          Sale Amount Range
                        </h5>
                        <AmountRangeFilter
                          minimumAmt={
                            saleFilter?.saleRange?.minimumAmount || ""
                          }
                          maximumAmt={
                            saleFilter?.saleRange?.maximumAmount || ""
                          }
                          handleSetSaleFilter={handleSetSaleFilter}
                        />
                      </Tab.Pane>
                    </Tab.Content>
                    <div className="mt-3">
                      <button
                        className="btn btn-outline-secondary m-2"
                        type="button"
                        onClick={resetFilters}
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
