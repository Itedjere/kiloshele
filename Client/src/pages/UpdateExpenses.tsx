import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import { GiPayMoney } from "react-icons/gi";
import { TbMoneybag } from "react-icons/tb";
import CustomToggleButton from "../components/company/CustomToggleButton";
import { FaReceipt, FaRegCalendarAlt } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import SelectDropdown from "../components/company/SelectDropdown";
import AddCategoryModal from "../components/company/Modals/AddCategoryModal";
import { FaPlus } from "react-icons/fa6";
import { GrPowerReset } from "react-icons/gr";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addExpenseSchema,
  handleApolloErrors,
  handleAxiosFileUploadErrors,
} from "../utitlities/utils";
import {
  AddExpenseFormDataType,
  UFileInterface,
} from "../utitlities/typesUtils";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import {
  GET_EXPENSES_CATEGORIES,
  GET_ONE_EXPENSE,
} from "../utitlities/graphql_queries";
import FileDropzone from "../components/company/FileUpload/FileDropzone";
import { useAuthenticatedContext } from "../components/company/Contexts/AuthenticationContext";
import { toast } from "react-toastify";
import {
  DELETE_EXPENSE_FILE,
  UPDATE_EXPENSES,
} from "../utitlities/graphql_mutation";
import { PaymentMethod, PaymentStatus } from "../__generated__/graphql";
import UpdateExpenseSkeleton from "../components/company/LoadingSkeletons/UpdateExpenseSkeleton";
import { useParams } from "react-router";
import ServerError from "../components/company/Network/ServerError";

export default function UpdateExpenses() {
  const [files, setFiles] = useState<UFileInterface[]>([]);
  const [serverFiles, setServerFiles] = useState<string[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("0");
  const [showCategoryModal, setShowCategoryModal] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // For displaying selected item
  const [anyCategoryError, setAnyCategoryError] = useState(false);

  const { expenseId } = useParams();
  const { auth } = useAuthenticatedContext();

  const { loading: dataExpensesLoading, data: dataExpensesCategories } =
    useQuery(GET_EXPENSES_CATEGORIES);
  const {
    loading: expenseLoading,
    data: expenseData,
    error: expenseError,
  } = useQuery(GET_ONE_EXPENSE, {
    variables: {
      expenseId: expenseId || "",
    },
  });

  const [updateExpenses] = useMutation(UPDATE_EXPENSES);

  const [deleteFile, { loading: isDeletingFile }] =
    useMutation(DELETE_EXPENSE_FILE);

  useEffect(() => {
    if (dataExpensesCategories) {
      const newCategories = dataExpensesCategories.expensesCategories;
      setCategories(newCategories);
    }
  }, [dataExpensesCategories]);

  const handleShowCategoryModalVisibility = (show: boolean): void => {
    setShowCategoryModal(show);
  };

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

  const handleAccordionSelect = (eventKey: AccordionEventKey) => {
    if (eventKey !== undefined) {
      setActiveAccordion(eventKey as string);
    }
  };

  const handleDeleteFile = async (fileUrl: string) => {
    try {
      const { data } = await deleteFile({
        variables: {
          fileUrl,
          resourceId: expenseId || "",
          resourceType: "Expense",
        },
      });

      if (data?.deleteExpenseFile) {
        setServerFiles(data.deleteExpenseFile.mediaUrl);
        return toast.success("File Attachment Deleted Successfully.");
      }

      toast.error("An error occurred. Try again.");
    } catch (error) {
      if (error instanceof ApolloError) {
        // handle Apollo graphql error
        handleApolloErrors(error);
      } else {
        console.error("An error occurred", error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddExpenseFormDataType>({
    resolver: yupResolver(addExpenseSchema),
  });

  useEffect(() => {
    if (expenseData?.expenseOne) {
      const expense = expenseData.expenseOne;
      reset({
        title: expense.title,
        amount: expense.amount,
        date: new Date(expense.date).toISOString().split("T")[0], // Set the default value for the date
        payment_method: expense.payment_method,
        payment_status: expense.payment_status,
        additional_notes: expense.additional_notes,
      });
      setSelectedCategory(expense.category);
      // Set previous photos setlected
      setServerFiles(expense.mediaUrl);
    }
  }, [expenseData, reset]);

  const onSubmit: SubmitHandler<AddExpenseFormDataType> = async (formData) => {
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
        fileFormData.append("expenses", file);
      });

      try {
        // Upload the image to the server
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/upload/expensesfiles`,
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
        if (axios.isAxiosError(error)) {
          handleAxiosFileUploadErrors(error);
        } else {
          console.error("Error:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }

        setActiveAccordion("2");
        return; // This return is necessary to prevent the next try catch block below from running
      }
    }

    try {
      const { data } = await updateExpenses({
        variables: {
          expenseId: expenseId || "",
          expenseInfo: {
            title: formData.title,
            amount: formData.amount,
            date: new Date(formData.date).toISOString(),
            payment_method: formData.payment_method as PaymentMethod,
            payment_status: formData.payment_status as PaymentStatus,
            additional_notes: formData.additional_notes,
            category: selectedCategory,
            mediaUrl,
          },
        },
      });

      if (data?.updateExpense) {
        handleResetForm();
        // show a toast message
        toast.success("Expense updated successfully");
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
    if (errors.title || errors.amount) {
      setActiveAccordion("0");
    } else if (errors.date || errors.payment_method || errors.payment_status) {
      setActiveAccordion("1");
    } else if (errors.additional_notes) {
      setActiveAccordion("3");
    }

    // Also check category for error
    if (selectedCategory === "") {
      setAnyCategoryError(true);
      setActiveAccordion("0");
    }
  };

  const handleResetForm = () => {
    // reset some defaults
    setFiles([]);
    setActiveAccordion("0");
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearchTerm.toLowerCase())
  );

  if (expenseError)
    return (
      <ServerError
        errorMessage={expenseError.message}
        url={`${import.meta.env.VITE_CLIENT_URL}/all-expenses`}
      />
    );

  return (
    <>
      <div className="container-fluid pt-4">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-white rounded h-100 p-2">
              <h6 className="mb-4">
                <GiPayMoney className="me-3 fs-3" />
                Update Expense
              </h6>
              {expenseLoading ? (
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
                          <TbMoneybag className="me-2 fs-5" />
                          <span>Expense Details</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-sm-12 col-lg-4 mb-3">
                            <div className="form-floating">
                              <input
                                type="text"
                                className={`form-control ${
                                  errors.title && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder="Title/Description"
                                {...register("title")}
                              />
                              <label htmlFor="floatingInput">
                                Title/Description
                              </label>
                            </div>
                            {errors.title && (
                              <div className="invalid-feedback d-block">
                                {errors.title.message}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-12 col-lg-4">
                            <div className="form-floating mb-3">
                              <input
                                type="number"
                                className={`form-control ${
                                  errors.amount && "is-invalid"
                                }`}
                                id="floatingInput"
                                placeholder="Amount"
                                step="0.01"
                                min="0"
                                {...register("amount")}
                              />
                              <label htmlFor="floatingInput">Amount</label>
                            </div>
                            {errors.amount && (
                              <div className="invalid-feedback d-block">
                                {errors.amount.message}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-12 col-lg-4">
                            {dataExpensesLoading ? (
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
                          <FaRegCalendarAlt className="me-2 fs-5" />
                          <span>Date, Payment Method and Status</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p>
                          <small>
                            Change date if expenses was not done today. Also
                            payment method and status
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
                          <FaReceipt className="me-2 fs-5" />
                          <span>File Attachment (Optional)</span>
                        </p>
                      </Accordion.Header>
                      <Accordion.Body>
                        <div className="row">
                          <div className="col-12">
                            <p>
                              <small>
                                You can upload up to 3 files, each less than
                                3MB. Accepted file types include images, PDFs,
                                and Excel files.
                              </small>
                            </p>
                            <FileDropzone
                              serverFiles={serverFiles}
                              handleDeleteFile={handleDeleteFile}
                              isDeletingFile={isDeletingFile}
                              files={files}
                              setFiles={setFiles}
                              accept={{
                                "image/*": [],
                                "application/pdf": [],
                                "application/vnd.ms-excel": [],
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                                  [],
                              }}
                              maxFiles={3}
                            />
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
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>
                        <p className="mb-0 text-black">
                          <TfiWrite className="me-2 fs-5" />
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
                                  errors.additional_notes && "is-invalid"
                                }`}
                                placeholder="Leave Additional Notes"
                                id="floatingTextarea"
                                style={{ height: "150px" }}
                                {...register("additional_notes")}
                              ></textarea>
                              <label htmlFor="floatingTextarea">
                                Additional Notes
                              </label>
                            </div>
                            {errors.additional_notes && (
                              <div className="invalid-feedback d-block">
                                {errors.additional_notes.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between">
                          <CustomToggleButton eventKey="2" direction="previous">
                            Previous
                          </CustomToggleButton>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <div className="row">
                    <div className="col-12 mt-3">
                      <button type="submit" className="btn btn-primary m-2">
                        <FaPlus className="me-2" />
                        Update Expenses
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
              )}
            </div>
          </div>
        </div>
      </div>
      <AddCategoryModal
        showCategoryModal={showCategoryModal}
        handleAddNewCategory={handleAddNewCategory}
        handleShowCategoryModalVisibility={handleShowCategoryModalVisibility}
      />
    </>
  );
}
