import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import SearchFilter from "../components/company/SearchFilters/SearchFilter";
import ProductItem from "../components/company/Products/ProductItem";
import CustomOffCanvas from "../components/company/CustomOffCanvas";
import ProductsEmpty from "../components/company/Products/ProductsEmpty";
import { ApolloError, Reference, useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utitlities/graphql_queries";
import ExpensesSkeleton from "../components/company/LoadingSkeletons/ExpensesSkeleton";
import ServerError from "../components/company/Network/ServerError";
import { ProductType } from "../utitlities/typesUtils";
import {
  formatPrice,
  getFileType,
  handleApolloErrors,
} from "../utitlities/utils";
import DeleteModal from "../components/company/Modals/DeleteModal";
import { DELETE_PRODUCT } from "../utitlities/graphql_mutation";
import { toast } from "react-toastify";
import LightGalleryWrapper from "../components/company/LightGallery/LightGalleryWrapper";
import Masonry from "react-masonry-css";
import ProductStatistics from "../components/company/Products/ProductStatistics";

export default function Products() {
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
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

  const {
    loading: productsLoading,
    error: productsError,
    data: productsData,
    fetchMore,
  } = useQuery(GET_PRODUCTS);

  useEffect(() => {
    if (productsData?.products) {
      const { nextCursor } = productsData.products;

      setCursor(nextCursor || null);
      if (!nextCursor) {
        setHasMore(false);
      }
    }
  }, [productsData]);

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

  const fetchProducts = () => {
    fetchMore({
      variables: {
        cursor,
      },
      updateQuery(previousData, { fetchMoreResult }) {
        if (!fetchMoreResult) return previousData;
        return {
          products: {
            __typename: fetchMoreResult.products.__typename,
            nextCursor: fetchMoreResult.products.nextCursor,
            list: [
              ...previousData.products.list,
              ...fetchMoreResult.products.list,
            ],
          },
        };
      },
    });
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
      <ProductStatistics />
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
              {productsData?.products &&
              productsData.products.list.length === 0 ? (
                <ProductsEmpty />
              ) : (
                <>
                  <div className="row">
                    <SearchFilter />
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <InfiniteScroll
                        dataLength={productsData?.products.list.length || 0}
                        next={fetchProducts}
                        hasMore={hasMore}
                        loader={<ExpensesSkeleton />}
                        endMessage={
                          <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                      >
                        <ul className="list-group list-group-flush">
                          {productsData?.products.list.map((product) => (
                            <ProductItem
                              key={product._id}
                              product={product}
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
            {productSelected?.tags && productSelected.tags.length > 0
              ? productSelected.tags.join(", ")
              : "NIL"}
          </li>
        </ul>
        {productSelected?.mediaUrl && productSelected.mediaUrl.length > 0 && (
          <>
            Photos
            <ul className="list-group mb-3">
              <li className="list-group-item bg-transparent">
                <LightGalleryWrapper>
                  <Masonry
                    breakpointCols={2}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {productSelected.mediaUrl.map((fileUrl, index) => {
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
            </ul>
          </>
        )}
      </CustomOffCanvas>
      <DeleteModal
        itemName={productToDelete?.type === "PRODUCT" ? "Product" : "Service"}
        isDeleting={isDeleting}
        showDeleteModal={showDeleteModal}
        handleDelete={handleRemoveProduct}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </>
  );
}
