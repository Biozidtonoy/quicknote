import { useState } from "react";
import "../styles/loginpage.css";
import {login} from "../api/auth";
import axios from "axios";
import { saveToken, getToken } from "../services/authStorage";
import { Link } from "react-router";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();
  setError("");

  try {
    const data = await login(
      email,
      password
    );
    
    saveToken(
    data.access_token
    );

  const token = getToken();

  if (!token) {
    console.log("User is not logged in.");
  } else {
    console.log("User is logged in.");
  }

    console.log("Login successful!");
    console.log(data);

  } 
  catch (error) {

    if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ??
          "Login failed. Please try again."
        );
    }
    else {
        setError("Something went wrong.");
    }
  }
}
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <h1>QuickNote</h1>
          <h2>Welcome Back</h2>
          <p>Sign in to continue managing your notes.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account?
          <Link to = "/register">
          Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;