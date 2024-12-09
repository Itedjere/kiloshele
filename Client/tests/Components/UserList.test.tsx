import { render, screen } from "@testing-library/react";
import React from "react";
import UserList from "../../src/pages/UserList";

import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";
import { UserType } from "../../src/utitlities/utils";

describe("UserList", () => {
  it("should render a paragraph when users array is empty", () => {
    const { container } = render(<UserList users={[]} />);
    console.log(container.innerHTML);

    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it("should render all list items with correct links", () => {
    const users: UserType[] = [
      { id: 1, name: "Johnson", isAdmin: true },
      { id: 2, name: "Micheal", isAdmin: false },
    ];

    render(<UserList users={users} />);

    users.forEach((user) => {
      const link = screen.getByRole("link", { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/users/${user.id}`);
    });
  });
});
