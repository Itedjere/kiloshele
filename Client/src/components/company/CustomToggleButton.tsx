import { ReactNode } from "react";
import { useAccordionButton } from "react-bootstrap";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface CustomToggleButtonProps {
  children: ReactNode;
  eventKey: string;
  direction?: "previous" | "next";
}

export default function CustomToggleButton({
  children,
  eventKey,
  direction,
}: CustomToggleButtonProps) {
  const handleAccordionToggle = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return (
    <button
      type="button"
      className="btn btn-primary btn-sm m-2"
      onClick={handleAccordionToggle}
    >
      {direction === "previous" && <SlArrowLeft />}
      {children}
      {direction === "next" && <SlArrowRight />}
    </button>
  );
}
