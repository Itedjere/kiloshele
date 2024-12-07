import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoIosSave } from "react-icons/io";
import { MdCloseFullscreen } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";

interface AddCategoryModalProps {
  showCategoryModal: boolean;
  handleShowCategoryModalVisibility: (show: boolean) => void;
}

export default function AddCategoryModal({
  showCategoryModal,
  handleShowCategoryModalVisibility,
}: AddCategoryModalProps) {
  return (
    <Modal
      show={showCategoryModal}
      onHide={() => handleShowCategoryModalVisibility(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <TbCategoryPlus className="me-2" />
          Add a new category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-sm-12">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Category Name"
              />
              <label htmlFor="floatingInput">Category Name</label>
            </div>
          </div>
          <div className="col-sm-12">
            <button type="button" className="btn btn-primary w-100">
              <IoIosSave className="me-2" />
              Save Category
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => handleShowCategoryModalVisibility(false)}
        >
          <MdCloseFullscreen className="me-2" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
