import React from "react";

import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Greeting from "../../src/pages/Greeting";
import "@testing-library/jest-dom/vitest";

describe("Greeting", () => {
  it("should render hello name when name is provided", async () => {
    render(<Greeting name="Godspower" />);

    await screen.queryByRole("heading");

    expect(screen.queryByRole("heading")).toHaveTextContent(/Hello Godspower/i);
  });

  it("should render button when name is not provided", () => {
    render(<Greeting />);

    const heading = screen.getByRole("button");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/login/i);
  });
});
