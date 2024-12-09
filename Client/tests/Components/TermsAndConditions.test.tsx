import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import TermsAndConditions from "../../src/pages/TermsAndConditions";

describe("TermsAndConditions", () => {
  it("should not be checked and button should be disabled", () => {
    render(<TermsAndConditions />);

    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should render checkbox as checked and submit button as not disabled", async () => {
    const user = userEvent.setup();

    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByRole("button")).not.toBeDisabled();
  });
});
