import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await axios.post(`${API}/api/auth/signup`, {
        email,
        password,
      });

      alert("Account created! Please login.");
      window.location.href = "/home";
    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="wrapper login-wrapper">
      <div className="screen-backdrop"></div>

      <div className="login-screen">
        <div className="login-header">
          <h1>Sign Up</h1>
        </div>

        <div className="login-card">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="login-btn" onClick={handleSignup}>
            Create Account
          </button>

          <p className="switch-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
