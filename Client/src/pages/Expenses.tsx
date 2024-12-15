import { useState } from "react";
import {
  FaChartArea,
  FaChartBar,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa6";
import moment from "moment";
import CardStatistics from "../components/company/Dashboard/CardStatistics";
import { GiPayMoney } from "react-icons/gi";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import DateFilter from "../components/company/SearchFilters/DateFilter";
import CustomOffCanvas from "../components/company/CustomOffCanvas";
import ExpensesItem from "../components/company/Expenses/ExpensesItem";
import ExpensesEmpty from "../components/company/Expenses/ExpensesEmpty";
import { useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../utitlities/graphql_queries";
import StatisticsSkeleton from "../components/company/LoadingSkeletons/StatisticsSkeleton";
import ExpensesSkeleton from "../components/company/LoadingSkeletons/ExpensesSkeleton";
import { ExpensesType } from "../utitlities/typesUtils";
import { formatPrice } from "../utitlities/utils";
import DeleteModal from "../components/company/Modals/DeleteModal";

export default function Expenses() {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState<ExpensesType | null>(
    null
  );
  const [expenseToDelete, setExpenseToDelete] = useState<ExpensesType | null>(
    null
  );
  const { loading, data } = useQuery(GET_EXPENSES);

  const handleOffCanvasClose = () => setShowOffCanvas(false);
  const handleOffCanvasShow = (expense: ExpensesType) => {
    setExpenseSelected(expense);
    setShowOffCanvas(true);
  };

  const handleCloseDeleteModal = () => {
    setExpenseToDelete(null);
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = (expense: ExpensesType) => {
    setExpenseToDelete(expense);
    setShowDeleteModal(true);
  };

  const handleRemoveExpense = () => {
    console.log(expenseToDelete);
  };
  return (
    <>
      {loading ? (
        <StatisticsSkeleton />
      ) : (
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
      )}

      <div className="container-fluid pt-4">
        <div className="bg-white rounded h-100 p-4 mt-4">
          <h6 className="mb-4">
            <GiPayMoney className="me-3 fs-4" />
            Expenses Record
          </h6>
          {loading ? (
            <ExpensesSkeleton />
          ) : (
            <>
              {data?.expenses.length === 0 ? (
                <ExpensesEmpty />
              ) : (
                <>
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
                        {data?.expenses.map((expense) => (
                          <ExpensesItem
                            key={expense._id}
                            handleOffCanvasShow={handleOffCanvasShow}
                            expense={expense}
                            handleRemoveExpense={handleShowDeleteModal}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
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
              <small>Title: {expenseSelected?.title}</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>Category: {expenseSelected?.category}</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>
                Amount:{" "}
                {formatPrice(
                  expenseSelected?.amount ? expenseSelected.amount : 0
                )}
              </small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>
                Date: {moment(expenseSelected?.date).format("MMMM Do YYYY")}
              </small>
            </p>
          </li>
        </ul>
        Payment Details
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Payment Method: {expenseSelected?.payment_method}</small>
            </p>
          </li>
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Payment Status: {expenseSelected?.payment_status}</small>
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
              <small>
                {expenseSelected?.additional_notes
                  ? expenseSelected.additional_notes
                  : "Nil"}
              </small>
            </p>
          </li>
        </ul>
      </CustomOffCanvas>
      <DeleteModal
        itemName="Expense"
        showDeleteModal={showDeleteModal}
        handleDelete={handleRemoveExpense}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </>
  );
}
