import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import ProductOrService from "../components/company/Products/ProductOrService";
import { GiConverseShoe } from "react-icons/gi";
import { FaBus, FaPlus, FaTrash } from "react-icons/fa6";
import { FaHashtag, FaRegMoneyBillAlt } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { AiFillPicture } from "react-icons/ai";
import AddCategoryModal from "../components/company/Modals/AddCategoryModal";
import ServiceDurationFeesModal from "../components/company/Modals/ServiceDurationFeesModal";
import SelectDropdown from "../components/company/SelectDropdown";
import CustomToggleButton from "../components/company/CustomToggleButton";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS_CATEGORIES } from "../utitlities/graphql_queries";
import { GrPowerReset } from "react-icons/gr";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import { UFileInterface } from "../utitlities/typesUtils";
import FileDropzone from "../components/company/FileUpload/FileDropzone";

export default function AddProduct() {
  const {
    loading: dataProductsCategoriesLoading,
    data: dataProductsCategories,
  } = useQuery(GET_PRODUCTS_CATEGORIES);

  const [files, setFiles] = useState<UFileInterface[]>([]);

  const [activeAccordion, setActiveAccordion] = useState<string | null>("0");

  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // For displaying selected item
  const [anyCategoryError, setAnyCategoryError] = useState(false);

  const [showServiceDurationFeesModal, setShowDurationServiceFeesModal] =
    useState<boolean>(false);
  const [offerType, setOfferType] = useState<string>("Product");

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

  const handleResetForm = () => {
    // reset some defaults
    // reset();
    setFiles([]);
    setSelectedCategory("");
    setActiveAccordion("0");
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
                              className="form-control"
                              id="floatingInput"
                              placeholder={`${offerType} Name`}
                            />
                            <label htmlFor="floatingInput">
                              {offerType} Name
                            </label>
                          </div>
                          <small>Example: 1 plate of rice with turkey</small>
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
                                  className="btn btn-sm"
                                  onClick={() =>
                                    handleShowCategoryModalVisibility(true)
                                  }
                                >
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
                          <div className="col-sm-12 col-lg-4">
                            <div className="form-floating mb-3">
                              <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Product ID/Code"
                              />
                              <label htmlFor="floatingInput">
                                Product ID/Code (Optional)
                              </label>
                            </div>
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
                          {offerType === "Product" && "Inventory and "}Financial
                          Details:
                        </span>
                      </p>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        {offerType === "Product" && (
                          <>
                            <div className="col-sm-12 col-lg-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="Product Name"
                                />
                                <label htmlFor="floatingInput">
                                  Stock Quantity
                                </label>
                              </div>
                            </div>
                            <div className="col-sm-12 col-lg-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  className="form-control"
                                  id="floatingInput"
                                  placeholder="Restock Level"
                                />
                                <label htmlFor="floatingInput">
                                  Level to restock(Optional)
                                </label>
                              </div>
                            </div>
                          </>
                        )}
                        <div className="col-sm-12 col-lg-3">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="floatingInput"
                              placeholder="Cost Price"
                            />
                            <label htmlFor="floatingInput">Cost Price</label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-3">
                          <div className="form-floating mb-3">
                            <input
                              type="number"
                              className="form-control"
                              id="floatingInput"
                              placeholder="Selling Price"
                            />
                            <label htmlFor="floatingInput">Selling Price</label>
                          </div>
                        </div>
                        {offerType === "Service" && (
                          <>
                            <div className="col-12">
                              <small>
                                <button
                                  className="btn btn-sm"
                                  onClick={() =>
                                    handleShowServiceDurationFeesModal(true)
                                  }
                                >
                                  Add Other Fees based on Duration If
                                  Any(Optional)
                                </button>
                              </small>
                            </div>
                            <div className="row mb-4">
                              <div className="col-12">
                                <ul className="list-group">
                                  <li className="list-group-item bg-transparent">
                                    <div className="row">
                                      <div className="col-sm-12 col-md-3">
                                        2 Hours
                                      </div>
                                      <div className="col-sm-12 col-md-3">
                                        <strong>Cost Price: </strong>NGN10,000
                                      </div>
                                      <div className="col-sm-12 col-md-3">
                                        <strong>Selling Price: </strong>
                                        NGN12,000
                                      </div>
                                      <div className="col-sm-12 col-md-3 d-flex justify-content-end">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-danger"
                                        >
                                          <FaTrash />
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-group-item bg-transparent">
                                    <div className="row">
                                      <div className="col-sm-12 col-md-3">
                                        2 Hours
                                      </div>
                                      <div className="col-sm-12 col-md-3">
                                        <strong>Cost Price: </strong>NGN10,000
                                      </div>
                                      <div className="col-sm-12 col-md-3">
                                        <strong>Selling Price: </strong>
                                        NGN12,000
                                      </div>
                                      <div className="col-sm-12 col-md-3 d-flex justify-content-end">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-danger"
                                        >
                                          <FaTrash />
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="list-group-item bg-transparent">
                                    <div className="row">
                                      <div className="col-sm-12 col-md-3">
                                        2 Hours
                                      </div>
                                      <div className="col-sm-12 col-md-3">
                                        <strong>Cost Price: </strong>NGN10,000
                                      </div>
                                      <div className="col-sm-12 col-md-3">
                                        <strong>Selling Price: </strong>
                                        NGN12,000
                                      </div>
                                      <div className="col-sm-12 col-md-3 d-flex justify-content-end">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-danger"
                                        >
                                          <FaTrash />
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
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
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <textarea
                              className="form-control"
                              placeholder={`${offerType} Description`}
                              id="floatingTextarea"
                              style={{ height: "150px" }}
                            ></textarea>
                            <label htmlFor="floatingTextarea">
                              {offerType} Description
                            </label>
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
                        <FaBus className="me-2 fs-4" />
                        <span>Supplier Info (Optional):</span>
                      </p>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className="row">
                        <div className="col-sm-12 col-lg-6">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="Supplier Name"
                            />
                            <label htmlFor="floatingInput">Supplier Name</label>
                          </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder="Supplier Number"
                            />
                            <label htmlFor="floatingInput">
                              Supplier Number
                            </label>
                          </div>
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
                        <div className="col-sm-12">
                          <div className="form-floating mb-3">
                            <input
                              type="text"
                              className="form-control"
                              id="floatingInput"
                              placeholder={`${offerType} Tags`}
                            />
                            <label htmlFor="floatingInput">
                              {offerType} Tags
                            </label>
                          </div>
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
        showServiceDurationFeesModal={showServiceDurationFeesModal}
        handleShowServiceDurationFeesModal={handleShowServiceDurationFeesModal}
      />
    </>
  );
}
