import { ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";

interface CustomOffCanvasProps {
  title?: string;
  showOffCanvas: boolean;
  handleOffCanvasClose: () => void;
  children: ReactNode;
}

export default function CustomOffCanvas({
  children,
  title,
  showOffCanvas,
  handleOffCanvasClose,
}: CustomOffCanvasProps) {
  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={handleOffCanvasClose}
      scroll={false}
      backdrop={true}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
}
