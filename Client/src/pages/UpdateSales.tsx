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
  AddSalesFormDataType,
  Item_SoldType,
  ItemsToSellType,
  ProductType,
  SalesSummaryType,
} from "../utitlities/typesUtils";
import {
  ApolloError,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { GET_ONE_SALE, GET_PRODUCTS } from "../utitlities/graphql_queries";
import debounce from "lodash.debounce";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSaleSchema, handleApolloErrors } from "../utitlities/utils";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import { UPDATE_SALE } from "../utitlities/graphql_mutation";
import { toast } from "react-toastify";
import { PaymentMethod, PaymentStatus } from "../__generated__/graphql";
import { useParams } from "react-router";
import ServerError from "../components/company/Network/ServerError";
import UpdateExpenseSkeleton from "../components/company/LoadingSkeletons/UpdateExpenseSkeleton";

export default function UpdateSales() {
  const { saleId } = useParams();
  const [activeAccordion, setActiveAccordion] = useState<string | null>("0");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [selectedProducts, setSelectedProducts] = useState<Item_SoldType[]>([]);
  const [noProductSelectedError, setNoProductSelectedError] = useState(false);
  const [salesSummary, setSalesSummary] = useState<SalesSummaryType>({
    potential_profit: 0,
    total_quantity: 0,
    total_sales: 0,
  });
  const limit: number = 6;

  const {
    loading: saleLoading,
    data: saleData,
    error: saleError,
  } = useQuery(GET_ONE_SALE, {
    variables: {
      saleId: saleId || "",
    },
  });

  useEffect(() => {
    let total_quantity: number = 0;
    let total_sales: number = 0;
    let total_cost: number = 0;

    if (selectedProducts.length > 0) {
      selectedProducts.forEach((product) => {
        total_quantity += product.quantity;
        total_sales += product.quantity * product.selling_price;
        total_cost += product.quantity * product.cost_price;
      });
    }

    setSalesSummary((prevSalesSummary) => ({
      ...prevSalesSummary,
      total_quantity,
      total_sales,
      potential_profit: total_sales - total_cost,
    }));
  }, [selectedProducts]);

  // Add Products
  const [updateSales] = useMutation(UPDATE_SALE);

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
      }
    },
  });

  useEffect(() => {
    if (productData) {
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
        return prevSelectedProducts.map((item) =>
          item._id === itemSold._id
            ? {
                ...item,
                quantity:
                  item.product.type === "PRODUCT" ? item.quantity + 1 : 1,
              }
            : item
        );
      } else {
        // If the item doesn't exist, add it with quantity_sold set to 1
        return [
          {
            _id: itemSold._id,
            cost_price: itemSold.cost_price,
            selling_price: itemSold.selling_price,
            quantity: 1,
            other_fees: itemSold.other_fees,
            product: {
              name: itemSold.name,
              category: itemSold.category,
              type: itemSold.type,
            },
          },
          ...prevSelectedProducts,
        ];
      }
    });
  };

  const handleItemSoldPriceChangeOnTyping = (
    value: string,
    itemSold: Item_SoldType
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
    itemSold: Item_SoldType
  ) => {
    setSelectedProducts((prevSelecedProducts) => {
      return prevSelecedProducts.map((item) => {
        if (item._id === itemSold._id) {
          if (changeType === "INCREMENT") {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return {
            ...item,
            quantity: item.quantity - 1 === 0 ? 1 : item.quantity - 1,
          };
        }
        return item;
      });
    });
  };

  const handleRemoveItemSold = (itemSold: Item_SoldType) => {
    setSelectedProducts((prevSelectedproducts) => {
      return prevSelectedproducts.filter(
        (product) => product._id !== itemSold._id
      );
    });
  };

  const handleAccordionSelect = (eventKey: AccordionEventKey) => {
    if (eventKey !== undefined) {
      setActiveAccordion(eventKey as string);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSalesFormDataType>({
    resolver: yupResolver(addSaleSchema),
  });

  useEffect(() => {
    if (saleData?.saleOne) {
      const sale = saleData?.saleOne;
      //   Update the form
      reset({
        date: new Date(sale?.date).toISOString().split("T")[0], // Set the default value for the date
        payment_method: sale?.payment_method,
        payment_status: sale.payment_status,
        customer_name: sale.customer_name,
        customer_phone: sale.customer_phone,
        customer_reference: sale.customer_reference,
        additional_note: sale.additional_note,
        staff_assigned: sale.staff_assigned,
      });

      //   update selected Items
      setSelectedProducts(sale.itemSold);
    }
  }, [reset, saleData]);

  const onSubmit: SubmitHandler<AddSalesFormDataType> = async (formData) => {
    // Check if category is empty
    if (selectedProducts.length === 0) {
      setNoProductSelectedError(true);
      setActiveAccordion("0");
      return;
    }

    // Prepare the items to sell
    let itemsToSell: ItemsToSellType[] = selectedProducts.map((product) => {
      return {
        cost_price: product.cost_price,
        selling_price: product.selling_price,
        quantity: product.quantity,
        product: product._id,
      };
    });

    try {
      const { data } = await updateSales({
        variables: {
          saleId: saleId || "",
          saleInfo: {
            ...formData,
            date: new Date(formData.date).toISOString(),
            payment_method: formData.payment_method as PaymentMethod,
            payment_status: formData.payment_status as PaymentStatus,
            itemSold: itemsToSell,
          },
        },
      });

      if (data?.updateSale) {
        // reset the form
        handleResetForm();
        // show toast message
        toast.success("Sales updated successfully");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        // handle Apollo graphql error
        handleApolloErrors(error);
      } else {
        console.error("An error occurred", error);
      }
    }
  };

  const onError = () => {
    if (errors.date || errors.payment_method || errors.payment_status) {
      setActiveAccordion("1");
    } else if (
      errors.customer_name ||
      errors.customer_phone ||
      errors.customer_reference
    ) {
      setActiveAccordion("3");
    } else if (errors.additional_note) {
      setActiveAccordion("4");
    }

    // Also check category for error
    if (selectedProducts.length === 0) {
      setNoProductSelectedError(true);
      setActiveAccordion("0");
    }
  };

  const handleResetForm = () => {
    // reset some defaults
    setActiveAccordion("0");
  };

  if (saleError)
    return (
      <ServerError
        errorMessage={saleError.message}
        url={`${import.meta.env.VITE_CLIENT_URL}/all-sales`}
      />
    );

  return (
    <div className="container-fluid pt-4 px-lg-4">
      <div className="row g-4">
        <div className="col-12">
          <div className="bg-white rounded h-100 p-2">
            <h6 className="mb-4">
              <FaRegMoneyBillAlt className="me-3 fs-4" />
              Add Sales
            </h6>
            {initialLoading || saleLoading ? (
              <UpdateExpenseSkeleton />
            ) : (
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Accordion
                  defaultActiveKey="0"
                  activeKey={activeAccordion}
                  onSelect={handleAccordionSelect}
                >
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
                            noProductSelectedError={noProductSelectedError}
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
                          {noProductSelectedError && (
                            <div className="invalid-feedback d-block">
                              Please add a product or service
                            </div>
                          )}
                        </div>
                      </div>
                      {selectedProducts.length > 0 && (
                        <>
                          <div className="row">
                            {selectedProducts.map((selectedProduct) => {
                              if (selectedProduct.product.type === "PRODUCT") {
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
                                    handleRemoveItemSold={handleRemoveItemSold}
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
                        <div className="col-sm-12 col-lg-4 mb-3">
                          <div className="form-floating">
                            <input
                              type="date"
                              className={`form-control ${
                                errors.date && "is-invalid"
                              }`}
                              id="floatingInput"
                              placeholder="Sales Date"
                              {...register("date")}
                            />
                            <label htmlFor="floatingInput">Sales Date</label>
                          </div>
                          {errors.date && (
                            <div className="invalid-feedback d-block">
                              {errors.date.message}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-12 col-lg-4 mb-3">
                          <div className="form-floating">
                            <select
                              className={`form-select ${
                                errors.payment_method && "is-invalid"
                              }`}
                              id="floatingSelect"
                              aria-label="label for payment method"
                              {...register("payment_method")}
                            >
                              <option value="">Click Here</option>
                              <option value="CARD">Card</option>
                              <option value="CASH">Cash</option>
                              <option value="BANK_TRANSFER">
                                Bank Transfer
                              </option>
                            </select>
                            <label htmlFor="floatingSelect">
                              Select Payment method
                            </label>
                          </div>
                          {errors.payment_method && (
                            <div className="invalid-feedback d-block">
                              {errors.payment_method.message}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-12 col-lg-4 mb-3">
                          <div className="form-floating">
                            <select
                              className={`form-select ${
                                errors.payment_status && "is-invalid"
                              }`}
                              id="floatingSelect"
                              aria-label="label for payment status"
                              {...register("payment_status")}
                            >
                              <option value="">Click Here</option>
                              <option value="PAID">Paid</option>
                              <option value="PENDING">Pending</option>
                              <option value="PARTIALLY_PAID">
                                Partially Paid
                              </option>
                            </select>
                            <label htmlFor="floatingSelect">
                              Select Payment Status
                            </label>
                          </div>
                          {errors.payment_status && (
                            <div className="invalid-feedback d-block">
                              {errors.payment_status.message}
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="0" direction="previous">
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
                              className={`form-select ${
                                errors.staff_assigned && "is-invalid"
                              }`}
                              id="floatingSelect"
                              aria-label="Floating label select example"
                              {...register("staff_assigned")}
                            >
                              <option value="">Click Here</option>
                              <option value="1">Paid</option>
                              <option value="2">Pending</option>
                              <option value="3">Partially Paid</option>
                            </select>
                            <label htmlFor="floatingSelect">Select Staff</label>
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="1" direction="previous">
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
                          Enter the customer name, phone number and notes for
                          future reference
                        </small>
                      </p>
                      <div className="row">
                        <div className="col-sm-12 col-lg-6 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.customer_name && "is-invalid"
                              }`}
                              id="floatingInput"
                              placeholder="Customer Name"
                              {...register("customer_name")}
                            />
                            <label htmlFor="floatingInput">Customer Name</label>
                          </div>
                          {errors.customer_name && (
                            <div className="invalid-feedback d-block">
                              {errors.customer_name.message}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-12 col-lg-6 mb-3">
                          <div className="form-floating">
                            <input
                              type="text"
                              className={`form-control ${
                                errors.customer_phone && "is-invalid"
                              }`}
                              id="floatingInput"
                              placeholder="Customer Phone number"
                              {...register("customer_phone")}
                            />
                            <label htmlFor="floatingInput">
                              Customer Phone number
                            </label>
                          </div>
                          {errors.customer_phone && (
                            <div className="invalid-feedback d-block">
                              {errors.customer_phone.message}
                            </div>
                          )}
                        </div>
                        <div className="col-12 mb-3">
                          <div className="form-floating">
                            <textarea
                              className={`form-control ${
                                errors.customer_reference && "is-invalid"
                              }`}
                              placeholder="Leave a comment here"
                              id="floatingTextarea"
                              style={{ height: "150px" }}
                              {...register("customer_reference")}
                            ></textarea>
                            <label htmlFor="floatingTextarea">
                              Notes for future reference
                            </label>
                          </div>
                          {errors.customer_reference && (
                            <div className="invalid-feedback d-block">
                              {errors.customer_reference.message}
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="2" direction="previous">
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
                              className={`form-control ${
                                errors.additional_note && "is-invalid"
                              }`}
                              placeholder="Leave Additional Notes"
                              id="floatingTextarea"
                              style={{ height: "150px" }}
                              {...register("additional_note")}
                            ></textarea>
                            <label htmlFor="floatingTextarea">
                              Additional Notes
                            </label>
                          </div>
                          {errors.additional_note && (
                            <div className="invalid-feedback d-block">
                              {errors.additional_note.message}
                            </div>
                          )}
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="3" direction="previous">
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
                      type="submit"
                      className="btn btn-primary m-2"
                      disabled={
                        filterLoading ||
                        products.length === 0 ||
                        selectedProducts.length === 0
                      }
                    >
                      <FaPlus className="me-2" />
                      Update Sale
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary m-2"
                      disabled={
                        filterLoading ||
                        products.length === 0 ||
                        selectedProducts.length === 0
                      }
                      onClick={handleResetForm}
                    >
                      <GrPowerReset className="me-2" />
                      Reset Form
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
