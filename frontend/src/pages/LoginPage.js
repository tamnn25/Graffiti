import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login logic
    if (email && password) {
      alert(`Welcome, ${email}!`);
      navigate("/ai-sketch");
    } else {
      alert("Please enter your credentials.");
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">Login</h2>
          <p className="text-muted">Access your AI Sketch Dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate("/")}
          >
            ← Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
