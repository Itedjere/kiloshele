import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaTrash } from "react-icons/fa6";

interface ServiceDurationFeesModalProps {
  showServiceDurationFeesModal: boolean;
  handleShowServiceDurationFeesModal: (show: boolean) => void;
}

export default function ServiceDurationFeesModal({
  showServiceDurationFeesModal,
  handleShowServiceDurationFeesModal,
}: ServiceDurationFeesModalProps) {
  return (
    <Modal
      show={showServiceDurationFeesModal}
      onHide={() => handleShowServiceDurationFeesModal(false)}
      size="xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Other Service Fee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Duration"
              />
              <label htmlFor="floatingInput">Duration</label>
            </div>
            <small>Example: 1 Hour, 30 Minutes</small>
          </div>
          <div className="col-sm-12 col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="Cost Price"
              />
              <label htmlFor="floatingInput">Cost Price</label>
            </div>
          </div>
          <div className="col-sm-12 col-lg-6 mb-3">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                id="floatingInput"
                placeholder="Service Fee"
              />
              <label htmlFor="floatingInput">Selling Price</label>
            </div>
          </div>
          <div className="col-sm-12 mb-3">
            <button type="button" className="btn btn-primary w-100">
              Add Fee
            </button>
          </div>
          <div className="col-12">
            <ul className="list-group">
              <li className="list-group-item bg-transparent">
                <div className="row">
                  <div className="col-sm-12 col-md-3">2 Hours</div>
                  <div className="col-sm-12 col-md-3">
                    <strong>Cost Price: </strong>NGN10,000
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <strong>Selling Price: </strong>NGN12,000
                  </div>
                  <div className="col-sm-12 col-md-3 d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-danger">
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
              <li className="list-group-item bg-transparent">
                <div className="row">
                  <div className="col-sm-12 col-md-3">2 Hours</div>
                  <div className="col-sm-12 col-md-3">
                    <strong>Cost Price: </strong>NGN10,000
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <strong>Selling Price: </strong>NGN12,000
                  </div>
                  <div className="col-sm-12 col-md-3 d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-danger">
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
              <li className="list-group-item bg-transparent">
                <div className="row">
                  <div className="col-sm-12 col-md-3">2 Hours</div>
                  <div className="col-sm-12 col-md-3">
                    <strong>Cost Price: </strong>NGN10,000
                  </div>
                  <div className="col-sm-12 col-md-3">
                    <strong>Selling Price: </strong>NGN12,000
                  </div>
                  <div className="col-sm-12 col-md-3 d-flex justify-content-end">
                    <button type="button" className="btn btn-sm btn-danger">
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleShowServiceDurationFeesModal(false)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
