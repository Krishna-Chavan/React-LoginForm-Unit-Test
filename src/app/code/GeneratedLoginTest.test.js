import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../../Components/LoginForm"

describe("LoginForm", () => {
  test("renders login form with username and password input fields and a submit button", () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("typing into the username input field updates the username state correctly", () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    const usernameInput = screen.getByLabelText("Username:");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    
    expect(usernameInput.value).toBe("testuser");
  });

  test("typing into the password input field updates the password state correctly", () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    
    expect(passwordInput.value).toBe("testpassword");
  });

  test("calls onSubmit function with correct username and password values when form is submitted", () => {
    const onSubmitMock = jest.fn();
    render(<LoginForm onSubmit={onSubmitMock} />);
    
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });
    
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    fireEvent.click(submitButton);
    
    expect(onSubmitMock).toHaveBeenCalledWith({ username: "testuser", password: "testpassword" });
  });
});
