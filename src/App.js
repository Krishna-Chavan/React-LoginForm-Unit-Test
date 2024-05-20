// src/App.js

import React from "react";
import "./App.css";
import LoginForm from "./Components/LoginForm";

function App() {
  const handleLogin = (formData) => {
    console.log("Login form submitted:", formData);
    // Here you can add your login logic
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Login Form</h1>
        <LoginForm onSubmit={handleLogin} />
      </header>
    </div>
  );
}

export default App;
