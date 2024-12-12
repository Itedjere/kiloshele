import { yupResolver } from "@hookform/resolvers/yup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";
import { IoIosSave } from "react-icons/io";
import { MdCloseFullscreen } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { OtherServiceFeeFormDataType } from "../../../utitlities/typesUtils";
import { otherServiceFeeSchema } from "../../../utitlities/utils";
import OtherServiceFees from "../Products/OtherServiceFees";

interface ServiceDurationFeesModalProps {
  otherFees: OtherServiceFeeFormDataType[];
  handleRemoveOtherServiceFee: (serviceFeeId: number | undefined) => void;
  setOtherFees: React.Dispatch<
    React.SetStateAction<OtherServiceFeeFormDataType[]>
  >;
  showServiceDurationFeesModal: boolean;
  handleShowServiceDurationFeesModal: (show: boolean) => void;
}

export default function ServiceDurationFeesModal({
  otherFees,
  handleRemoveOtherServiceFee,
  setOtherFees,
  showServiceDurationFeesModal,
  handleShowServiceDurationFeesModal,
}: ServiceDurationFeesModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OtherServiceFeeFormDataType>({
    resolver: yupResolver(otherServiceFeeSchema),
  });

  const onSubmit: SubmitHandler<OtherServiceFeeFormDataType> = async (data) => {
    const formData: OtherServiceFeeFormDataType = {
      id: Date.now(),
      ...data,
    };
    // Submit form Data to the parent
    setOtherFees((otherFees) => [formData, ...otherFees]);

    reset();
  };

  return (
    <Modal
      show={showServiceDurationFeesModal}
      onHide={() => handleShowServiceDurationFeesModal(false)}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <TbCategoryPlus className="me-2" />
          Other Service Fee
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-12 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className={`form-control ${errors.duration && "is-invalid"}`}
                  id="floatingInput"
                  placeholder="Duration"
                  {...register("duration")}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <small>Example: 1 Hour, Diamond Package</small>
              {errors.duration && (
                <div className="invalid-feedback d-block">
                  {errors.duration.message}
                </div>
              )}
            </div>
            <div className="col-sm-12 col-lg-6 mb-3">
              <div className="form-floating">
                <input
                  type="number"
                  min={1}
                  step={0.01}
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
            <div className="col-sm-12 col-lg-6 mb-3">
              <div className="form-floating">
                <input
                  type="number"
                  min={1}
                  step={0.01}
                  className={`form-control ${
                    errors.selling_price && "is-invalid"
                  }`}
                  id="floatingInput"
                  placeholder="Service Fee"
                  {...register("selling_price")}
                />
                <label htmlFor="floatingInput">Selling Price</label>
              </div>
              {errors.selling_price && (
                <div className="invalid-feedback d-block">
                  {errors.selling_price.message}
                </div>
              )}
            </div>
            <div className="col-sm-12 mb-3">
              <button type="submit" className="btn btn-primary w-100">
                <IoIosSave className="me-2" />
                Add Fee
              </button>
            </div>
          </div>
        </form>
        {otherFees.length > 0 && (
          <div className="row">
            <div className="col-12">
              <OtherServiceFees
                otherFees={otherFees}
                handleRemoveOtherServiceFee={handleRemoveOtherServiceFee}
              />
            </div>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleShowServiceDurationFeesModal(false)}
        >
          <MdCloseFullscreen className="me-2" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
