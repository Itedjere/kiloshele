import { RiDeleteBin6Fill } from "react-icons/ri";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdCloseFullscreen, MdGppGood } from "react-icons/md";
import { TbCancel } from "react-icons/tb";

interface DeleteModalProps {
  itemName: string;
  showDeleteModal: boolean;
  handleDelete: () => void;
  handleCloseDeleteModal: () => void;
}

export default function DeleteModal({
  itemName,
  showDeleteModal,
  handleDelete,
  handleCloseDeleteModal,
}: DeleteModalProps) {
  return (
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center">
          <RiDeleteBin6Fill className="me-2" />
          Delete {itemName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this {itemName}!</p>
        <Button
          variant="outline-danger"
          size="sm"
          className="me-3 mb-3"
          onClick={handleDelete}
        >
          <MdGppGood className="me-2" />
          Yes, Delete It
        </Button>
        <Button
          variant="primary"
          size="sm"
          className="me-3 mb-3"
          onClick={handleCloseDeleteModal}
        >
          <TbCancel className="me-2" />
          No, Cancel
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={handleCloseDeleteModal}>
          <MdCloseFullscreen className="me-2" />
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
