import { useEffect, useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import Accordion from "react-bootstrap/Accordion";
import ProductOrService from "../components/company/Products/ProductOrService";
import { GiConverseShoe } from "react-icons/gi";
import { FaBus, FaPlus } from "react-icons/fa6";
import { FaHashtag, FaRegMoneyBillAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { LuNotebookPen } from "react-icons/lu";
import { AiFillPicture } from "react-icons/ai";
import AddCategoryModal from "../components/company/Modals/AddCategoryModal";
import ServiceDurationFeesModal from "../components/company/Modals/ServiceDurationFeesModal";
import SelectDropdown from "../components/company/SelectDropdown";
import CustomToggleButton from "../components/company/CustomToggleButton";
import { GET_PRODUCTS_CATEGORIES } from "../utitlities/graphql_queries";
import { GrPowerReset } from "react-icons/gr";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import {
  AddProductsFormDataType,
  OtherServiceFeeFormDataType,
  UFileInterface,
} from "../utitlities/typesUtils";
import FileDropzone from "../components/company/FileUpload/FileDropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema, handleApolloErrors } from "../utitlities/utils";
import OtherServiceFees from "../components/company/Products/OtherServiceFees";
import axios from "axios";
import { useAuthenticatedContext } from "../components/company/Contexts/AuthenticationContext";
import { toast } from "react-toastify";
import { ADD_PRODUCTS } from "../utitlities/graphql_mutation";
import {
  OtherServiceFeesInput,
  ServiceOrProduct,
} from "../__generated__/graphql";

export default function AddProduct() {
  const {
    loading: dataProductsCategoriesLoading,
    data: dataProductsCategories,
  } = useQuery(GET_PRODUCTS_CATEGORIES);

  const [addProducts] = useMutation(ADD_PRODUCTS, {
    update(cache, { data }) {
      if (!data) return;

      const newCategory = data.addProduct.category;

      cache.modify({
        fields: {
          productsCategories(existingCategories = []) {
            if (existingCategories.includes(newCategory)) {
              return existingCategories;
            }

            return [newCategory, ...existingCategories];
          },
        },
      });
    },
  });

  const [files, setFiles] = useState<UFileInterface[]>([]);

  const [otherFees, setOtherFees] = useState<OtherServiceFeeFormDataType[]>([]);

  const [activeAccordion, setActiveAccordion] = useState<string | null>("0");

  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // For displaying selected item
  const [anyCategoryError, setAnyCategoryError] = useState(false);

  const [showServiceDurationFeesModal, setShowDurationServiceFeesModal] =
    useState<boolean>(false);
  const [offerType, setOfferType] = useState<string>("Product");

  const { auth } = useAuthenticatedContext();

  useEffect(() => {
    if (dataProductsCategories) {
      const newCategories = dataProductsCategories.productsCategories;
      setCategories(newCategories);
    }
  }, [dataProductsCategories]);

  const handleSetSelectedCategory = (item: string) => {
    setSelectedCategory(item);
    setAnyCategoryError(false);
  };

  const handleAddNewCategory = (newCategory: string) => {
    const doesCategoryExist = categories.some(
      (category) => category.toLowerCase() === newCategory.toLowerCase()
    );
    console.log("Does Category exist", doesCategoryExist);
    console.log("Categories", categories);

    if (!doesCategoryExist) {
      setCategories((categories) => [newCategory, ...categories]);
    }
    setSelectedCategory(newCategory);
    handleShowCategoryModalVisibility(false);
    setAnyCategoryError(false);
  };

  const handleShowCategoryModalVisibility = (show: boolean): void => {
    setShowCategoryModal(show);
  };

  const handleShowServiceDurationFeesModal = (show: boolean): void => {
    setShowDurationServiceFeesModal(show);
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
  } = useForm<AddProductsFormDataType>({
    resolver: yupResolver(addProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      cost_price: 1,
      selling_price: 1,
      description: "",
      quantity: 1,
      restock_level: 1,
      supplier_name: "",
      supplier_phone: "",
      tags: "",
    },
  });

  const onSubmit: SubmitHandler<AddProductsFormDataType> = async (formData) => {
    // Check if category is empty
    if (selectedCategory === "") {
      setAnyCategoryError(true);
      setActiveAccordion("0");
      return;
    }

    let mediaUrl = [];

    if (files.length > 0) {
      const fileFormData = new FormData();
      files.forEach((file) => {
        fileFormData.append("files", file);
      });

      try {
        // Upload the image to the server
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/upload/productfiles`,
          fileFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        // Check if fileUrl is returned
        if (!response.data.success) {
          throw new Error("No file URLs returned from server.");
        }
        mediaUrl = response.data.fileUrls;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
        console.error("Error uploading files:", error);
        return; // This return is necessary to prevent the next try catch block below from running
      }
    }

    // Set Tags
    const tags = formData?.tags ? formData.tags.split(",") : [];

    // Set Type Product | Service
    const type = offerType === "Product" ? "PRODUCT" : "SERVICE";

    // Set Other Service Fees
    let other_fees: OtherServiceFeesInput[] = [];
    if (otherFees.length > 0) {
      other_fees = otherFees.map((serviceFees) => {
        return {
          duration: serviceFees.duration,
          cost_price: serviceFees.cost_price,
          selling_price: serviceFees.selling_price,
        };
      });
    }

    try {
      const { data } = await addProducts({
        variables: {
          productInfo: {
            ...formData,
            category: selectedCategory,
            tags: tags,
            photos: mediaUrl,
            type: type as ServiceOrProduct,
            other_fees: otherFees.length > 0 ? other_fees : otherFees,
          },
        },
      });

      if (data?.addProduct) {
        handleResetForm();
        // show a toast message
        toast.success("Product added successfully");
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
    if (errors.name || errors.sku) {
      setActiveAccordion("0");
    } else if (
      errors.quantity ||
      errors.restock_level ||
      errors.cost_price ||
      errors.selling_price
    ) {
      setActiveAccordion("1");
    } else if (errors.description) {
      setActiveAccordion("3");
    } else if (errors.supplier_name || errors.supplier_phone) {
      setActiveAccordion("4");
    } else if (errors.tags) {
      setActiveAccordion("5");
    }

    // Also check category for error
    if (selectedCategory === "") {
      setAnyCategoryError(true);
      setActiveAccordion("0");
    }
  };

  const handleResetForm = () => {
    // reset some defaults
    reset();
    setFiles([]);
    setOtherFees([]);
    setSelectedCategory("");
    setActiveAccordion("0");
  };

  const handleRemoveOtherServiceFee = (feeId: number | undefined) => {
    if (feeId !== undefined) {
      setOtherFees(otherFees.filter((fees) => fees.id !== feeId));
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container-fluid pt-4 px-lg-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-white rounded h-100 p-2">
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <ProductOrService
                  offerType={offerType}
                  setOfferType={setOfferType}
                />
                <div className="mt-4">
                  <Accordion
                    defaultActiveKey="0"
                    activeKey={activeAccordion}
                    onSelect={handleAccordionSelect}
                  >
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <p className="mb-0 text-black">
                          <GiConverseShoe className="me-2 fs-4" />
                          <span>Basic {offerType} Details:</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-sm-12 col-lg-4 mb-3">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.name && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder={`${offerType} Name`}
                                {...register("name")}
                              />
                              <label htmlFor="floatingInput">
                                {offerType} Name
                              </label>
                            </div>
                            <small>Example: 1 plate of rice with turkey</small>
                            {errors.name && (
                              <div className="invalid-feedback d-block">
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-12 col-lg-4 mb-3">
                            {dataProductsCategoriesLoading ? (
                              <p>Loading Categories...</p>
                            ) : (
                              <>
                                <SelectDropdown
                                  anyCategoryError={anyCategoryError}
                                  searchTerm={categorySearchTerm}
                                  setSearchTerm={setCategorySearchTerm}
                                  setSelectedItem={handleSetSelectedCategory}
                                  filteredItems={filteredCategories}
                                >
                                  <small>Category</small>
                                  <p className="mb-0">
                                    {selectedCategory === ""
                                      ? "Click To Choose Category"
                                      : selectedCategory}
                                  </p>
                                </SelectDropdown>
                                <small>
                                  <button
                                    type="button"
                                    className="btn btn-sm text-primary"
                                    onClick={() =>
                                      handleShowCategoryModalVisibility(true)
                                    }
                                  >
                                    <BiSolidCategory />
                                    Add New Category
                                  </button>
                                </small>
                                {anyCategoryError && (
                                  <div className="invalid-feedback d-block">
                                    Please Select or Add A New Category
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                          {offerType === "Product" && (
                            <div className="col-sm-12 col-lg-4 mb-3">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  className={`form-control ${
                                    errors.sku && "is-invalid"
                                  }`}
                                  id="floatingInput"
                                  placeholder="Product ID/Code"
                                  {...register("sku")}
                                />
                                <label htmlFor="floatingInput">
                                  Product ID/Code (Optional)
                                </label>
                              </div>
                              {errors.sku && (
                                <div className="invalid-feedback d-block">
                                  {errors.sku.message}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
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
                          <FaRegMoneyBillAlt className="me-2 fs-4" />
                          <span>
                            {offerType === "Product" && "Inventory and "}
                            Financial Details:
                          </span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          {offerType === "Product" && (
                            <>
                              <div className="col-sm-12 col-lg-3 mb-3">
                                <div className="form-floating">
                                  <input
                                    type="number"
                                    min={1}
                                    step="0.01"
                                    className={`form-control ${
                                      errors.quantity && "is-invalid"
                                    }`}
                                    id="floatingInput"
                                    placeholder="Stock Quantity"
                                    {...register("quantity")}
                                  />
                                  <label htmlFor="floatingInput">
                                    Stock Quantity
                                  </label>
                                </div>
                                {errors.quantity && (
                                  <div className="invalid-feedback d-block">
                                    {errors.quantity.message}
                                  </div>
                                )}
                              </div>
                              <div className="col-sm-12 col-lg-3 mb-3">
                                <div className="form-floating">
                                  <input
                                    type="number"
                                    min={1}
                                    step="0.01"
                                    className={`form-control ${
                                      errors.restock_level && "is-invalid"
                                    }`}
                                    id="floatingInput"
                                    placeholder="Restock Level"
                                    {...register("restock_level")}
                                  />
                                  <label htmlFor="floatingInput">
                                    Level to restock(Optional)
                                  </label>
                                </div>
                                {errors.restock_level && (
                                  <div className="invalid-feedback d-block">
                                    {errors.restock_level.message}
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                          <div className="col-sm-12 col-lg-3 mb-3">
                            <div className="form-floating">
                              <input
                                type="number"
                                min={1}
                                step="0.01"
                                className={`form-control ${
                                  errors.cost_price && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder="Cost Price"
                                {...register("cost_price")}
                              />
                              <label htmlFor="floatingInput">Cost Price</label>
                            </div>
                            {errors.cost_price && (
                              <div className="invalid-feedback d-block">
                                {errors.cost_price.message}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-12 col-lg-3 mb-3">
                            <div className="form-floating">
                              <input
                                type="number"
                                min={1}
                                step="0.01"
                                className={`form-control ${
                                  errors.selling_price && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder="Selling Price"
                                {...register("selling_price")}
                              />
                              <label htmlFor="floatingInput">
                                Selling Price
                              </label>
                            </div>
                            {errors.selling_price && (
                              <div className="invalid-feedback d-block">
                                {errors.selling_price.message}
                              </div>
                            )}
                          </div>
                          {offerType === "Service" && (
                            <>
                              <div className="col-12">
                                <small>
                                  <button
                                    type="button"
                                    className="btn btn-sm text-primary"
                                    onClick={() =>
                                      handleShowServiceDurationFeesModal(true)
                                    }
                                  >
                                    <BiSolidCategory />
                                    Add Other Service Fees If Any(Optional)
                                  </button>
                                </small>
                              </div>
                              {otherFees.length > 0 && (
                                <div className="row mb-4">
                                  <div className="col-12">
                                    <OtherServiceFees
                                      otherFees={otherFees}
                                      handleRemoveOtherServiceFee={
                                        handleRemoveOtherServiceFee
                                      }
                                    />
                                  </div>
                                </div>
                              )}
                            </>
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
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        <p className="mb-0 text-black">
                          <LuNotebookPen className="me-2 fs-4" />
                          <span>Brief {offerType} Description(Optional)</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <div className="form-floating">
                              <textarea
                                className={`form-control ${
                                  errors.description && "is-invalid"
                                }`}
                                placeholder={`${offerType} Description`}
                                id="floatingTextarea"
                                style={{ height: "150px" }}
                                {...register("description")}
                              ></textarea>
                              <label htmlFor="floatingTextarea">
                                {offerType} Description
                              </label>
                            </div>
                            {errors.description && (
                              <div className="invalid-feedback d-block">
                                {errors.description.message}
                              </div>
                            )}
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
                          <FaBus className="me-2 fs-4" />
                          <span>Supplier Info (Optional):</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-sm-12 col-lg-6 mb-3">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.supplier_name && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder="Supplier Name"
                                {...register("supplier_name")}
                              />
                              <label htmlFor="floatingInput">
                                Supplier Name
                              </label>
                            </div>
                            {errors.supplier_name && (
                              <div className="invalid-feedback d-block">
                                {errors.supplier_name.message}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-12 col-lg-6 mb-3">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.supplier_phone && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder="Supplier Phone Number"
                                {...register("supplier_phone")}
                              />
                              <label htmlFor="floatingInput">
                                Supplier Phone Number
                              </label>
                            </div>
                            {errors.supplier_phone && (
                              <div className="invalid-feedback d-block">
                                {errors.supplier_phone.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="2" direction="previous">
                            Previous
                          </CustomToggleButton>
                          <CustomToggleButton eventKey="4" direction="next">
                            Next
                          </CustomToggleButton>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4">
                      <Accordion.Header>
                        <p className="mb-0 text-black">
                          <FaHashtag className="me-2 fs-4" />
                          <span>
                            Tags. They should be separated by comma. Example
                            large, red (Optional):
                          </span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-sm-12 mb-3">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.tags && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder={`${offerType} Tags`}
                                {...register("tags")}
                              />
                              <label htmlFor="floatingInput">
                                {offerType} Tags
                              </label>
                            </div>
                            {errors.tags && (
                              <div className="invalid-feedback d-block">
                                {errors.tags.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="3" direction="previous">
                            Previous
                          </CustomToggleButton>
                          <CustomToggleButton eventKey="5" direction="next">
                            Next
                          </CustomToggleButton>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="5">
                      <Accordion.Header>
                        <p className="mb-0 text-black">
                          <AiFillPicture className="me-2 fs-4" />
                          <span>{offerType} Photos (Optional):</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-12">
                            <p>
                              <small>
                                You can upload up to 3 pictures, each less than
                                3MB. Only Images / Pictures are allowed.
                              </small>
                            </p>
                            <FileDropzone
                              files={files}
                              setFiles={setFiles}
                              accept={{ "image/*": [] }}
                              maxFiles={3}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-start">
                          <CustomToggleButton eventKey="4" direction="previous">
                            Previous
                          </CustomToggleButton>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="row">
                  <div className="col-12 mt-3">
                    <button type="submit" className="btn btn-primary m-2">
                      <FaPlus className="me-2" />
                      Save Expenses
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary m-2"
                      onClick={handleResetForm}
                    >
                      <GrPowerReset className="me-2" />
                      Reset Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryModal
        showCategoryModal={showCategoryModal}
        handleAddNewCategory={handleAddNewCategory}
        handleShowCategoryModalVisibility={handleShowCategoryModalVisibility}
      />
      <ServiceDurationFeesModal
        otherFees={otherFees}
        handleRemoveOtherServiceFee={handleRemoveOtherServiceFee}
        setOtherFees={setOtherFees}
        showServiceDurationFeesModal={showServiceDurationFeesModal}
        handleShowServiceDurationFeesModal={handleShowServiceDurationFeesModal}
      />
    </>
  );
}
