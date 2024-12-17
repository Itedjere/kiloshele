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
import ProductsEmpty from "../components/company/Products/ProductsEmpty";
import { ApolloError, Reference, useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utitlities/graphql_queries";
import ExpensesSkeleton from "../components/company/LoadingSkeletons/ExpensesSkeleton";
import ServerError from "../components/company/Network/ServerError";
import { ProductType } from "../utitlities/typesUtils";
import { formatPrice, handleApolloErrors } from "../utitlities/utils";
import DeleteModal from "../components/company/Modals/DeleteModal";
import { DELETE_PRODUCT } from "../utitlities/graphql_mutation";
import { toast } from "react-toastify";

export default function Products() {
  const [offset, setOffset] = useState<number>(0);
  const [productSelected, setProductSelected] = useState<ProductType | null>(
    null
  );
  const [productToDelete, setProductToDelete] = useState<ProductType | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
    setShowDeleteModal(false);
  };

  const handleShowDeleteModal = (product: ProductType) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleOffCanvasClose = () => setShowOffCanvas(false);
  const handleOffCanvasShow = (product: ProductType) => {
    setProductSelected(product);
    setShowOffCanvas(true);
  };
  const limit: number = 20;

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      limit,
      offset,
    },
  });

  // Mutate the state after deletion
  const [deleteProduct, { loading: isDeleting }] = useMutation(DELETE_PRODUCT, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          products(
            existingProductsRefs: Reference | readonly Reference[] | undefined,
            { readField }: { readField: Function }
          ): readonly Reference[] {
            if (!data?.removeProduct) {
              return Array.isArray(existingProductsRefs)
                ? existingProductsRefs
                : [];
            }

            return Array.isArray(existingProductsRefs)
              ? existingProductsRefs.filter(
                  (ref: Reference) =>
                    data.removeProduct?._id !== readField("_id", ref)
                )
              : [];
          },
        },
      });
    },
  });

  const handleRemoveProduct = async () => {
    if (productToDelete === null) {
      handleCloseDeleteModal();
      return toast.error("Please Try again. Thank you");
    }

    try {
      const { data } = await deleteProduct({
        variables: {
          productId: productToDelete?._id,
        },
      });

      if (data?.removeProduct) {
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

  if (productsError)
    return (
      <ServerError
        errorMessage={productsError.message}
        url={`${import.meta.env.VITE_CLIENT_URL}`}
      />
    );

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
          {productsLoading ? (
            <ExpensesSkeleton />
          ) : (
            <>
              {productsData?.products.length === 0 ? (
                <ProductsEmpty />
              ) : (
                <>
                  <div className="row">
                    <SearchFilter />
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <ul className="list-group list-group-flush">
                        {productsData?.products.map((product) => (
                          <ProductItem
                            key={product._id}
                            product={product}
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
        title={
          productSelected?.type === "PRODUCT"
            ? "Product Details"
            : "Service Details"
        }
        showOffCanvas={showOffCanvas}
        handleOffCanvasClose={handleOffCanvasClose}
      >
        Basic {productSelected?.type === "PRODUCT" ? "Product" : "Service"}{" "}
        Details
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <strong>Name:</strong> {productSelected?.name}
          </li>
          <li className="list-group-item">
            <strong>Category:</strong> {productSelected?.category}
          </li>
          <li className="list-group-item">
            <strong>SKU Code:</strong>{" "}
            {productSelected?.sku ? productSelected.sku : "NIL"}
          </li>
        </ul>
        {productSelected?.type === "PRODUCT" && "Inventory & "}Financial
        Detaiils
        <ul className="list-group mb-3">
          {productSelected?.type === "PRODUCT" && (
            <>
              <li className="list-group-item">
                <strong>Stock Quantity:</strong> {productSelected.quantity}
              </li>
              <li className="list-group-item">
                <strong>Level to restock:</strong>{" "}
                {productSelected.restock_level}
              </li>
            </>
          )}
          <li className="list-group-item">
            <strong>Selling Price:</strong>{" "}
            {formatPrice(productSelected?.selling_price || 0)}
          </li>
          <li className="list-group-item">
            <strong>Cost Price:</strong>{" "}
            {formatPrice(productSelected?.cost_price || 0)}
          </li>
        </ul>
        {productSelected?.type === "SERVICE" && (
          <>
            {productSelected.other_fees.length > 0 && (
              <>
                Other Fees
                <ul className="list-group mb-3">
                  {productSelected.other_fees.map((other_fee) => (
                    <li className="list-group-item bg-transparent">
                      <div className="row">
                        <div className="col-sm-12 col-md-4">
                          {other_fee.duration}
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <strong>Cost Price: </strong>
                          {formatPrice(other_fee.cost_price)}
                        </div>
                        <div className="col-sm-12 col-md-4">
                          <strong>Selling Price: </strong>
                          {formatPrice(other_fee.selling_price)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        Brief Description
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <p>
              {productSelected?.description
                ? productSelected.description
                : "NIL"}
            </p>
          </li>
        </ul>
        Supplier Info
        <ul className="list-group mb-3">
          <li className="list-group-item">
            <strong>Name:</strong>{" "}
            {productSelected?.supplier_name
              ? productSelected.supplier_name
              : "NIL"}
          </li>
          <li className="list-group-item">
            <strong>Phone:</strong>{" "}
            {productSelected?.supplier_phone
              ? productSelected.supplier_phone
              : "NIL"}
          </li>
        </ul>
        Tags
        <ul className="list-group mb-3">
          <li className="list-group-item">
            {productSelected?.tags && productSelected.tags.join(", ")}
          </li>
        </ul>
        Photos
        <ul className="list-group mb-3">
          <li className="list-group-item">Photos</li>
        </ul>
      </CustomOffCanvas>
      <DeleteModal
        itemName="Product"
        isDeleting={isDeleting}
        showDeleteModal={showDeleteModal}
        handleDelete={handleRemoveProduct}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </>
  );
}
