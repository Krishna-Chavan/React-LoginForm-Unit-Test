import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../../Components/LoginForm";

describe("LoginForm", () => {
  test("renders correctly", () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    expect(screen.getByLabelText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  test("typing into username input field updates username state", () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    const usernameInput = screen.getByLabelText("Username:");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    
    expect(usernameInput.value).toBe("testuser");
  });

  test("typing into password input field updates password state", () => {
    render(<LoginForm onSubmit={() => {}} />);
    
    const passwordInput = screen.getByLabelText("Password:");
    fireEvent.change(passwordInput, { target: { value: "testpassword" } });
    
    expect(passwordInput.value).toBe("testpassword");
  });

  test("onSubmit function is called with correct username and password values", () => {
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

  test("onSubmit function is not called with empty username or password", () => {
    const onSubmitMock = jest.fn();
    render(<LoginForm onSubmit={onSubmitMock} />);
    
    const submitButton = screen.getByRole("button", { name: "Login" });
    
    fireEvent.click(submitButton);
    
    expect(onSubmitMock).not.toHaveBeenCalled();
  });

  test("error message is displayed when incorrect username or password is submitted", () => {
    const onSubmitMock = jest.fn();
    render(<LoginForm onSubmit={onSubmitMock} />);
    
    const usernameInput = screen.getByLabelText("Username:");
    const passwordInput = screen.getByLabelText("Password:");
    const submitButton = screen.getByRole("button", { name: "Login" });
    
    fireEvent.change(usernameInput, { target: { value: "incorrectuser" } });
    fireEvent.change(passwordInput, { target: { value: "incorrectpassword" } });
    fireEvent.click(submitButton);
    
    expect(screen.getByText("Incorrect username or password")).toBeInTheDocument();
  });
});