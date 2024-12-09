import React from "react";

import { it, expect, describe } from "vitest";
import { findByRole, render, screen } from "@testing-library/react";
import User from "../../src/pages/User";
import "@testing-library/jest-dom/vitest";
import { UserType } from "../../src/utitlities/utils";

describe("User", () => {
  it("should render users name on the screen", () => {
    const person: UserType = {
      id: 12,
      name: "Rhoda",
    };

    render(<User user={person} />);

    expect(screen.getByText(person.name)).toBeInTheDocument();
  });

  it("should render button when user is admin", async () => {
    const person: UserType = {
      id: 12,
      name: "Rhoda",
      isAdmin: true,
    };

    render(<User user={person} />);

    const heading = await screen.findByRole("button");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/edit/i);
  });

  it("should not render button when user is not admin", async () => {
    const person: UserType = {
      id: 12,
      name: "Rhoda",
    };

    const { container } = render(<User user={person} />);
    console.log(container.innerHTML); // Logs the rendered DOM

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
