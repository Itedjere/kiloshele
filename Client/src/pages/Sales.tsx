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
import { ApolloError, useMutation, useQuery } from "@apollo/client";
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

export default function Sales() {
  const [saleSelected, setSaleSelected] = useState<SalesType | null>(null);
  const [saleToDelete, setSaleToDelete] = useState<SalesType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [saleSelectedSummary, setSaleSelectedSummary] = useState<{
    totalQuantity: number;
    totalSales: number;
    totalProfit: number;
  }>({ totalQuantity: 0, totalSales: 0, totalProfit: 0 });

  // Fetch all sales
  const {
    loading: salesLoading,
    error: salesError,
    data: salesData,
  } = useQuery(GET_SALES);

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

  if (salesError)
    return (
      <ServerError
        errorMessage={salesError.message}
        url={`${import.meta.env.VITE_CLIENT_URL}`}
      />
    );

  //

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
          {salesLoading ? (
            <ExpensesSkeleton />
          ) : (
            <>
              {salesData?.sales && salesData.sales.length === 0 ? (
                <SalesEmpty />
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
                        {salesData?.sales.map((sale) => (
                          <SalesItem
                            key={sale._id}
                            sale={sale}
                            handleOffCanvasShow={handleOffCanvasShow}
                            handleShowDeleteModal={handleShowDeleteModal}
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
    </>
  );
}
