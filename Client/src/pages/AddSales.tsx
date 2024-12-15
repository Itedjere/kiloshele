import { useCallback, useEffect, useState } from "react";
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
import {
  ItemSoldType,
  ProductType,
  SalesSummaryType,
} from "../utitlities/typesUtils";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utitlities/graphql_queries";
import ProductsEmpty from "../components/company/Products/ProductsEmpty";
import debounce from "lodash.debounce";

export default function AddSales() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [hasZeroProducts, setHasZeroProducts] = useState(false);
  const [offset, setOffset] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<ItemSoldType[]>([]);
  const [salesSummary, setSalesSummary] = useState<SalesSummaryType>({
    potential_profit: 0,
    total_quantity: 0,
    total_sales: 0,
  });
  const limit: number = 6;

  useEffect(() => {
    let total_quantity: number = 0;
    let total_sales: number = 0;
    let total_cost: number = 0;

    if (selectedProducts.length > 0) {
      selectedProducts.forEach((product) => {
        total_quantity += product.quantity_sold;
        total_sales += product.quantity_sold * product.selling_price;
        total_cost += product.quantity_sold * product.cost_price;
      });
    }

    setSalesSummary((prevSalesSummary) => ({
      ...prevSalesSummary,
      total_quantity,
      total_sales,
      potential_profit: total_sales - total_cost,
    }));
  }, [selectedProducts]);

  // Initial Query
  const {
    loading: initialLoading,
    data: productData,
    fetchMore,
  } = useQuery(GET_PRODUCTS, {
    variables: {
      searchTerm: "",
      limit,
      offset: 0,
    },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      console.log("I alwasy run");
      if (data.products.length < limit) {
        setHasMoreProducts(false);
        if (data.products.length === 0) {
          // Show zero products message
          setHasZeroProducts(true);
        }
      }
    },
  });

  useEffect(() => {
    if (productData) {
      console.log(productData.products);

      setProducts(productData.products);
    }
  }, [productData]);

  // Infinite Scroll Handler
  const handleScroll = (
    event: React.UIEvent<HTMLDivElement>,
    searchTerm: string
  ) => {
    const target = event.currentTarget;

    if (
      target.scrollTop + target.clientHeight >= target.scrollHeight &&
      hasMoreProducts
    ) {
      fetchMore({
        variables: {
          searchTerm,
          limit,
          offset: offset + limit,
        },
      });
    }
  };

  // Lazy Query
  // Lazy Query for Filtering
  const [fetchFilteredProducts, { loading: filterLoading }] = useLazyQuery(
    GET_PRODUCTS,
    {
      fetchPolicy: "network-only", // Always fetch fresh data
      onCompleted: (data) => setProducts(data.products),
    }
  );

  // Debounced Search
  const handleProductsFilteration = useCallback(
    debounce((searchTerm: string) => {
      setOffset(0);
      fetchFilteredProducts({
        variables: {
          searchTerm,
          limit,
          offset: 0,
        },
      });
    }, 500),
    [] // Dependencies
  );

  const handleSelectedProduct = (itemSold: ProductType) => {
    setSelectedProducts((prevSelectedProducts) => {
      // Check if the item already exists in the array
      const existingProduct = prevSelectedProducts.find(
        (product) => product._id === itemSold._id
      );

      if (existingProduct) {
        // If the item exists, increase the quantity_sold
        return prevSelectedProducts.map((product) =>
          product._id === itemSold._id
            ? {
                ...product,
                quantity_sold:
                  product.quantity_sold + 1 > product.quantity
                    ? product.quantity
                    : product.quantity_sold + 1,
              }
            : product
        );
      } else {
        // If the item doesn't exist, add it with quantity_sold set to 1
        return [{ ...itemSold, quantity_sold: 1 }, ...prevSelectedProducts];
      }
    });
  };

  const handleItemSoldPriceChangeOnTyping = (
    value: string,
    itemSold: ItemSoldType
  ) => {
    const newPrice = parseInt(value) || 0;

    setSelectedProducts((prevSelectedProducts) => {
      return prevSelectedProducts.map((product) =>
        product._id === itemSold._id
          ? { ...product, selling_price: newPrice }
          : product
      );
    });
  };

  const handleItemSoldQuantityChange = (
    changeType: "INCREMENT" | "DECREMENT",
    itemSold: ItemSoldType
  ) => {
    setSelectedProducts((prevSelecedProducts) => {
      return prevSelecedProducts.map((product) => {
        if (product._id === itemSold._id) {
          if (changeType === "INCREMENT") {
            return {
              ...product,
              quantity_sold:
                product.quantity_sold + 1 > product.quantity
                  ? product.quantity
                  : product.quantity_sold + 1,
            };
          } else {
            return {
              ...product,
              quantity_sold:
                product.quantity_sold - 1 === 0 ? 1 : product.quantity_sold - 1,
            };
          }
        }
        return product;
      });
    });
  };

  const handleRemoveItemSold = (itemSold: ItemSoldType) => {
    setSelectedProducts((prevSelectedproducts) => {
      return prevSelectedproducts.filter(
        (product) => product._id !== itemSold._id
      );
    });
  };

  return (
    <div className="container-fluid pt-4 px-lg-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-white rounded h-100 p-2">
            <h6 className="mb-4">
              <FaRegMoneyBillAlt className="me-3 fs-4" />
              Add Sales
            </h6>
            {initialLoading ? (
              <p>Loading Products...</p>
            ) : (
              <>
                {hasZeroProducts ? (
                  <ProductsEmpty />
                ) : (
                  <>
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
                              <ProductDropdownSelectMenu
                                filterLoading={filterLoading}
                                products={products}
                                handleSelectedProduct={handleSelectedProduct}
                                handleProductsFilteration={
                                  handleProductsFilteration
                                }
                                handleScroll={handleScroll}
                              >
                                <>
                                  <small>Select Product / Service</small>
                                  <p className="mb-0">Click Here</p>
                                </>
                              </ProductDropdownSelectMenu>
                              <button type="button" className="btn btn-sm">
                                <small>Search Product by SKU Number</small>
                              </button>
                            </div>
                          </div>
                          {selectedProducts.length > 0 && (
                            <>
                              <div className="row">
                                {selectedProducts.map((selectedProduct) => {
                                  if (selectedProduct.type === "PRODUCT") {
                                    return (
                                      <div
                                        className="col-sm-12 col-md-4 mb-3"
                                        key={selectedProduct._id}
                                      >
                                        <SalesProductCard
                                          product={selectedProduct}
                                          handleItemSoldPriceChangeOnTyping={
                                            handleItemSoldPriceChangeOnTyping
                                          }
                                          handleItemSoldQuantityChange={
                                            handleItemSoldQuantityChange
                                          }
                                          handleRemoveItemSold={
                                            handleRemoveItemSold
                                          }
                                        />
                                      </div>
                                    );
                                  }
                                  return (
                                    <div
                                      className="col-sm-12 col-md-4 mb-3"
                                      key={selectedProduct._id}
                                    >
                                      <SalesServiceCard
                                        product={selectedProduct}
                                        handleItemSoldPriceChangeOnTyping={
                                          handleItemSoldPriceChangeOnTyping
                                        }
                                        handleRemoveItemSold={
                                          handleRemoveItemSold
                                        }
                                      />
                                    </div>
                                  );
                                })}
                              </div>
                              <div className="row">
                                <div className="col-sm-12 mb-3">
                                  <SalesSummary salesSummary={salesSummary} />
                                </div>
                              </div>
                            </>
                          )}
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
                              Change date if not today. Also payment method and
                              status
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
                                <label htmlFor="floatingInput">
                                  Sales Date
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
                                  <option value="">Click Here</option>
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
                                  <option value="">Click Here</option>
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
                              <CustomToggleButton
                                eventKey="0"
                                direction="previous"
                              >
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
                            <small>
                              Select your staff that did this transaction
                            </small>
                          </p>
                          <div className="row">
                            <div className="col-12">
                              <div className="form-floating mb-3">
                                <select
                                  className="form-select"
                                  id="floatingSelect"
                                  aria-label="Floating label select example"
                                >
                                  <option value="">Click Here</option>
                                  <option value="1">Paid</option>
                                  <option value="2">Pending</option>
                                  <option value="3">Partially Paid</option>
                                </select>
                                <label htmlFor="floatingSelect">
                                  Select Staff
                                </label>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">
                              <CustomToggleButton
                                eventKey="1"
                                direction="previous"
                              >
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
                              Enter the customer name, phone number and notes
                              for future reference
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
                                <label htmlFor="floatingInput">
                                  Customer Name
                                </label>
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
                              <CustomToggleButton
                                eventKey="2"
                                direction="previous"
                              >
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
                              <CustomToggleButton
                                eventKey="3"
                                direction="previous"
                              >
                                Previous
                              </CustomToggleButton>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <div className="row">
                      <div className="col-12 mt-3">
                        <button
                          type="button"
                          className="btn btn-primary m-2"
                          disabled={filterLoading || products.length === 0}
                        >
                          <FaPlus className="me-2" />
                          Save Sale
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary m-2"
                          disabled={filterLoading || products.length === 0}
                        >
                          <GrPowerReset className="me-2" />
                          Reset Form
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
