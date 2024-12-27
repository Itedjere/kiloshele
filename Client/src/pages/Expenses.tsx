import { useEffect, useState } from "react";
import moment from "moment";
import Masonry from "react-masonry-css";
import { GiPayMoney } from "react-icons/gi";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import DateFilter from "../components/company/SearchFilters/DateFilter";
import CustomOffCanvas from "../components/company/CustomOffCanvas";
import ExpensesItem from "../components/company/Expenses/ExpensesItem";
import ExpensesEmpty from "../components/company/Expenses/ExpensesEmpty";
import { ApolloError, Reference, useMutation, useQuery } from "@apollo/client";
import { GET_EXPENSES } from "../utitlities/graphql_queries";
import ExpensesSkeleton from "../components/company/LoadingSkeletons/ExpensesSkeleton";
import { ExpensesType } from "../utitlities/typesUtils";
import {
  formatPrice,
  getFileType,
  handleApolloErrors,
} from "../utitlities/utils";
import DeleteModal from "../components/company/Modals/DeleteModal";
import { DELETE_EXPENSES } from "../utitlities/graphql_mutation";
import { toast } from "react-toastify";
import ServerError from "../components/company/Network/ServerError";
import LightGalleryWrapper from "../components/company/LightGallery/LightGalleryWrapper";
import { FaFilePdf } from "react-icons/fa";
import { RiFileExcel2Fill } from "react-icons/ri";
import ExpenseStatistics from "../components/company/Expenses/ExpenseStatistics";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Expenses() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [expenseSelected, setExpenseSelected] = useState<ExpensesType | null>(
    null
  );
  const [expenseToDelete, setExpenseToDelete] = useState<ExpensesType | null>(
    null
  );

  // Remember to add error UI
  const { loading, error, data, fetchMore } = useQuery(GET_EXPENSES);

  useEffect(() => {
    if (data?.expenses) {
      const { nextCursor } = data.expenses;

      setCursor(nextCursor || null);
      if (!nextCursor) {
        setHasMore(false);
      }
    }
  }, [data]);

  // Mutate the state after deletion
  const [deleteExpense, { loading: isDeleting }] = useMutation(
    DELETE_EXPENSES,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            expenses(
              existingExpensesRefs:
                | Reference
                | readonly Reference[]
                | undefined,
              { readField }: { readField: Function }
            ): readonly Reference[] {
              if (!data?.removeExpense) {
                return Array.isArray(existingExpensesRefs)
                  ? existingExpensesRefs
                  : [];
              }

              return Array.isArray(existingExpensesRefs)
                ? existingExpensesRefs.filter(
                    (ref: Reference) =>
                      data.removeExpense?._id !== readField("_id", ref)
                  )
                : [];
            },
          },
        });
      },
    }
  );

  const handleOffCanvasClose = () => {
    setExpenseSelected(null);
    setShowOffCanvas(false);
  };
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

  const handleRemoveExpense = async () => {
    if (expenseToDelete === null) {
      handleCloseDeleteModal();
      return toast.error("Please Try again. Thank you");
    }

    try {
      const { data } = await deleteExpense({
        variables: {
          expenseId: expenseToDelete?._id,
        },
      });

      if (data?.removeExpense) {
        handleCloseDeleteModal();
        toast.success("Expense Deleted Successfully");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        handleApolloErrors(error);
      } else {
        console.error(error);
      }
    }
  };

  const fetchExpenses = () => {
    fetchMore({
      variables: {
        cursor,
      },
      updateQuery(previousData, { fetchMoreResult }) {
        console.log(fetchMoreResult);

        if (!fetchMoreResult) return previousData;
        return {
          expenses: {
            __typename: fetchMoreResult.expenses.__typename,
            nextCursor: fetchMoreResult.expenses.nextCursor,
            list: [
              ...previousData.expenses.list,
              ...fetchMoreResult.expenses.list,
            ],
          },
        };
      },
    });
  };

  if (error)
    return (
      <ServerError
        errorMessage={error.message}
        url={`${import.meta.env.VITE_CLIENT_URL}`}
      />
    );

  return (
    <>
      <ExpenseStatistics />
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
              {data?.expenses.list.length === 0 ? (
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
                      <InfiniteScroll
                        dataLength={data?.expenses.list.length || 0}
                        next={fetchExpenses}
                        hasMore={hasMore}
                        loader={<ExpensesSkeleton />}
                        endMessage={
                          <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                      >
                        <ul className="list-group list-group-flush">
                          {data?.expenses.list.map((expense) => (
                            <ExpensesItem
                              key={expense._id}
                              handleOffCanvasShow={handleOffCanvasShow}
                              expense={expense}
                              handleRemoveExpense={handleShowDeleteModal}
                            />
                          ))}
                        </ul>
                      </InfiniteScroll>
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
        {expenseSelected?.mediaUrl && expenseSelected.mediaUrl.length > 0 && (
          <>
            Receipt Attached
            <ul className="list-group mb-3">
              <li className="list-group-item bg-transparent">
                <LightGalleryWrapper>
                  <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {expenseSelected.mediaUrl.map((fileUrl, index) => {
                      if ("image" === getFileType(fileUrl)) {
                        return (
                          <div
                            data-src={`${
                              import.meta.env.VITE_SERVER_URL
                            }${fileUrl}`}
                            key={index}
                            className="lg-children"
                          >
                            <img
                              src={`${
                                import.meta.env.VITE_SERVER_URL
                              }${fileUrl}`}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        );
                      }
                    })}
                  </Masonry>
                </LightGalleryWrapper>
              </li>
              {expenseSelected.mediaUrl.map((fileUrl, index) => {
                const fileType = getFileType(fileUrl);
                if ("image" !== fileType) {
                  return (
                    <li className="list-group-item bg-transparent" key={index}>
                      <a
                        href={`${import.meta.env.VITE_SERVER_URL}${fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="d-flex align-items-center"
                      >
                        <span
                          className={`${
                            "pdf" === fileType ? "text-danger" : "text-success"
                          } me-3`}
                        >
                          {"pdf" === fileType ? (
                            <FaFilePdf />
                          ) : (
                            <RiFileExcel2Fill />
                          )}
                        </span>
                        {"pdf" === fileType
                          ? "View PDF Document"
                          : "View Excel Document"}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
          </>
        )}
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
        isDeleting={isDeleting}
        showDeleteModal={showDeleteModal}
        handleDelete={handleRemoveExpense}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </>
  );
}
