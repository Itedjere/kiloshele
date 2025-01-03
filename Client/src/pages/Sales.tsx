import { LuNotepadText } from "react-icons/lu";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import SalesItem from "../components/company/Sales/SalesItem";
import CustomOffCanvas from "../components/company/CustomOffCanvas";
import { useEffect, useState } from "react";
import SalesEmpty from "../components/company/Sales/SalesEmpty";
import {
  ApolloError,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { GET_SALES } from "../utitlities/graphql_queries";
import ServerError from "../components/company/Network/ServerError";
import ExpensesSkeleton from "../components/company/LoadingSkeletons/ExpensesSkeleton";
import { SalesType } from "../utitlities/typesUtils";
import { formatPrice, handleApolloErrors } from "../utitlities/utils";
import moment from "moment";
import DeleteModal from "../components/company/Modals/DeleteModal";
import { Reference } from "yup";
import { DELETE_SALE } from "../utitlities/graphql_mutation";
import { toast } from "react-toastify";
import SaleStaticstics from "../components/company/Sales/SaleStaticstics";
import InfiniteScroll from "react-infinite-scroll-component";
import SalesFilter from "../components/company/Sales/SalesFilter";
import { useFilterContext } from "../components/company/Contexts/FilterContext";

export default function Sales() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [sales, setSales] = useState<SalesType[]>([]);
  const [saleSelected, setSaleSelected] = useState<SalesType | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<SalesType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [saleSelectedSummary, setSaleSelectedSummary] = useState<{
    totalQuantity: number;
    totalSales: number;
    totalProfit: number;
  }>({ totalQuantity: 0, totalSales: 0, totalProfit: 0 });
  const {
    filters: { saleFilter },
  } = useFilterContext();

  // Total Sales Limit
  const limit: number = 10;

  // Fetch all sales
  const {
    loading: salesLoading,
    error: salesError,
    data: salesData,
    fetchMore,
  } = useQuery(GET_SALES, {
    variables: {
      filters: {
        limit,
      },
    },
  });

  const handleSetCursorAndSales = (
    nextCursor: string | null,
    list: SalesType[],
    totalResults: number
  ) => {
    // Set total Sales Found
    setTotalSales(totalResults);
    // Set Has more
    setHasMore(nextCursor ? true : false);
    // Set Cursor
    setCursor(nextCursor || null);
    // Set Sales
    setSales(list);
  };

  useEffect(() => {
    if (salesData?.sales) {
      const { nextCursor, list, totalResults } = salesData.sales;

      // Set Cursor
      if (nextCursor !== undefined) {
        handleSetCursorAndSales(nextCursor, list, totalResults);
      }
    }
  }, [salesData]);

  // Lazy Query for Filtering
  const [filterSales, { loading: filterLoading }] = useLazyQuery(GET_SALES, {
    fetchPolicy: "network-only", // Always fetch fresh data
    onCompleted: (data) => {
      const { nextCursor, list, totalResults } = data.sales;
      // Set Cursor
      if (nextCursor !== undefined) {
        handleSetCursorAndSales(nextCursor, list, totalResults);
      }
    },
  });

  useEffect(() => {
    const {
      paymentMethod,
      paymentStatus,
      staffAssigned,
      saleRange: { maximumAmount, minimumAmount },
      dateRange: { endDate, startDate },
    } = saleFilter;
    filterSales({
      variables: {
        filters: {
          limit,
          paymentStatus,
          paymentMethod,
          startDate,
          endDate,
          staffAssigned,
          maximumAmount,
          minimumAmount,
        },
      },
    });
  }, [saleFilter]);

  // Mutate the state after deletion
  const [deleteSale, { loading: isDeleting }] = useMutation(DELETE_SALE, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          sales(existingSalesRefs, { readField }: { readField: Function }) {
            if (!data?.removeSale) {
              return Array.isArray(existingSalesRefs) ? existingSalesRefs : [];
            }

            return Array.isArray(existingSalesRefs)
              ? existingSalesRefs.filter(
                  (ref: Reference) =>
                    data.removeSale?._id !== readField("_id", ref)
                )
              : [];
          },
        },
      });
    },
  });

  const handleShowDeleteModal = (sale: SalesType) => {
    setSaleToDelete(sale);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSaleToDelete(null);
    setShowDeleteModal(false);
  };

  const handleRemoveSale = async () => {
    if (saleToDelete === null) {
      handleCloseDeleteModal();
      return toast.error("Please Try again. Thank you");
    }

    try {
      const { data } = await deleteSale({
        variables: {
          saleId: saleToDelete?._id,
        },
      });

      if (data?.removeSale) {
        handleCloseDeleteModal();
        toast.success("Product Deleted Successfully");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        handleApolloErrors(error);
      } else {
        console.error(error);
      }
    }
  };

  const handleOffCanvasClose = () => setShowOffCanvas(false);
  const handleOffCanvasShow = (sale: SalesType) => {
    setSaleSelectedSummary((prevSummary) => {
      let totalQuantity: number = 0;
      let totalSales: number = 0;
      let totalCostSales: number = 0;
      let totalProfit: number = 0;
      sale.itemSold.forEach((aSale) => {
        totalQuantity += aSale.quantity;
        totalSales += aSale.quantity * aSale.selling_price;
        totalCostSales += aSale.quantity * aSale.cost_price;
      });
      totalProfit = totalSales - totalCostSales;

      return { ...prevSummary, totalProfit, totalQuantity, totalSales };
    });
    setSaleSelected(sale);
    setShowOffCanvas(true);
  };

  const fetchSales = () => {
    const {
      paymentMethod,
      paymentStatus,
      staffAssigned,
      saleRange: { maximumAmount, minimumAmount },
      dateRange: { endDate, startDate },
    } = saleFilter;

    fetchMore({
      variables: {
        filters: {
          limit,
          cursor,
          paymentStatus,
          paymentMethod,
          startDate,
          endDate,
          staffAssigned,
          maximumAmount,
          minimumAmount,
        },
      },
      updateQuery(previousData, { fetchMoreResult }) {
        if (!fetchMoreResult) return previousData;
        // Set has more to false if fetchMoreResult list is less than 10
        if (fetchMoreResult.sales.list.length < limit) setHasMore(false);
        // Set total Result Found
        setTotalSales(fetchMoreResult.sales.totalResults);
        return {
          sales: {
            __typename: fetchMoreResult.sales.__typename,
            totalResults: fetchMoreResult.sales.totalResults,
            nextCursor: fetchMoreResult.sales.nextCursor,
            list: [...previousData.sales.list, ...fetchMoreResult.sales.list],
          },
        };
      },
    });
  };

  const handleToggleFilter = () => {
    setShowFilter((prevShow) => !prevShow);
  };

  if (salesError)
    return (
      <ServerError
        errorMessage={salesError.message}
        url={`${import.meta.env.VITE_CLIENT_URL}`}
      />
    );

  return (
    <>
      <SaleStaticstics />
      <div className="container-fluid pt-4">
        <div className="bg-white rounded h-100 p-4 mt-4">
          <h6 className="mb-4">
            <LuNotepadText className="me-3 fs-4" />
            Sales Record
          </h6>
          {salesLoading || filterLoading ? (
            <ExpensesSkeleton />
          ) : (
            <>
              {sales.length === 0 ? (
                <SalesEmpty />
              ) : (
                <>
                  <div className="row">
                    <SearchFilter
                      handleToggleFilterContainer={handleToggleFilter}
                    />
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <InfiniteScroll
                        dataLength={sales.length}
                        next={fetchSales}
                        hasMore={hasMore}
                        loader={<ExpensesSkeleton />}
                        endMessage={
                          <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                      >
                        <ul className="list-group list-group-flush">
                          {sales.map((sale) => (
                            <SalesItem
                              key={sale._id}
                              sale={sale}
                              handleOffCanvasShow={handleOffCanvasShow}
                              handleShowDeleteModal={handleShowDeleteModal}
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
        title="Sales Details"
        showOffCanvas={showOffCanvas}
        handleOffCanvasClose={handleOffCanvasClose}
      >
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>
                Total Quantity Sold: {saleSelectedSummary.totalQuantity}
              </small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>
                Total Revenue Made:{" "}
                {formatPrice(saleSelectedSummary.totalSales)}
              </small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>
                Total Profit Made:{" "}
                {formatPrice(saleSelectedSummary.totalProfit)}
              </small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="mb-0 text-black">
              <small>
                Date: {moment(saleSelected?.date).format("MMMM Do YYYY")}
              </small>
            </p>
          </li>
        </ul>
        Product Detaiils
        {saleSelected?.itemSold.map((item) => (
          <div className="card mb-3">
            <div className="card-header text-black">
              <small>{item.product.name}</small>
            </div>
            <div className="card-body">
              <small>
                <p className="mb-2">Category: {item.product.category}</p>
                <p className="mb-2">Quantity Sold: {item.quantity}</p>
                <p className="mb-2">
                  Cost Price: {formatPrice(item.cost_price)}
                </p>
                <p className="mb-2">
                  Selling Price: {formatPrice(item.selling_price)}
                </p>
              </small>
            </div>
            <div className="card-footer text-end text-body-secondary">
              <small>
                Profit Made:{" "}
                {formatPrice(
                  item.quantity * item.selling_price -
                    item.quantity * item.cost_price
                )}
              </small>
            </div>
          </div>
        ))}
        Payment Details
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Payment Method: {saleSelected?.payment_method}</small>
            </p>
          </li>
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>Payment Status: {saleSelected?.payment_status}</small>
            </p>
          </li>
        </ul>
        Staff Assigned
        <ul className="list-group mb-3">
          <li className="list-group-item bg-transparent">
            <p className="text-black mb-0">
              <small>{saleSelected?.staff_assigned}</small>
            </p>
          </li>
        </ul>
        Customer Info
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>Name: {saleSelected?.customer_name}</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>Phone: {saleSelected?.customer_phone}</small>
            </p>
          </li>
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>Note: {saleSelected?.customer_reference}</small>
            </p>
          </li>
        </ul>
        Additional Notes
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p className="text-black mb-0">
              <small>{saleSelected?.additional_note}</small>
            </p>
          </li>
        </ul>
      </CustomOffCanvas>

      <DeleteModal
        itemName="Sale"
        isDeleting={isDeleting}
        showDeleteModal={showDeleteModal}
        handleDelete={handleRemoveSale}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />

      <SalesFilter
        totalResults={totalSales}
        showFilter={showFilter}
        handleToggleFilter={handleToggleFilter}
        filterLoading={filterLoading}
      />
    </>
  );
}
