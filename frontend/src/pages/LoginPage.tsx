import { useState } from "react";
import "../styles/loginpage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({email,password,});
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
          <span> Register</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;