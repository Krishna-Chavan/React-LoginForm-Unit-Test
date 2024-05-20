import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import LoginForm from "./Components/LoginForm";

describe("LoginForm", () => {
  it("renders login form with username and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("calls onSubmit with username and password when form is submitted", () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(loginButton);

    expect(mockSubmit).toHaveBeenCalledWith({
      username: "testuser",
      password: "testpassword",
    });
  });
});
