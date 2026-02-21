import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    console.log("SERVER RESPONSE:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("email", email);

    window.location.href = "/home";

    console.log("TOKEN SAVED:", localStorage.getItem("token"));

    window.location.href = "/home";
  } catch (err) {
    console.error("LOGIN ERROR:", err.response?.data);
    alert("Login failed");
  }
};

  

  return (
    <div className="wrapper login-wrapper">
      <div className="screen-backdrop"></div>

      <div className="login-screen">
        <div className="login-header">
          <h1>Sign In</h1>
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

          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          <p className="switch-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
