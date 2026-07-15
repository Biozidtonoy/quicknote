import "../styles/auth.css";
import { useState } from "react";
import { register } from "../api/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await register(
        name.trim(),
        email.trim().toLowerCase(),
        password
      );

      setName("");
      setEmail("");
      setPassword("");

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setSuccess("");

      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        if (typeof detail === "string") {
          setError(detail);
        } else if (Array.isArray(detail) && detail.length > 0) {
          setError(detail[0].msg);
        } else {
          setError("Registration failed. Please try again.");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="header">
          <h1>QuickNote</h1>
          <h2>Create Account</h2>
          <p>Create an account to start managing your notes.</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

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

          <button type="submit">Register</button>
        </form>

        <p className="register-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;