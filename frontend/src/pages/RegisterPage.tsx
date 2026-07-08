import "../styles/auth.css";
import { useState } from "react";
import {register} from "../api/auth";
import axios from "axios";
import { Link } from "react-router";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const data = await register(name, email, password);
      setError("");
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ??
            "Registration failed. Please try again.",
        );
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
          <Link to="/login">
          login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
