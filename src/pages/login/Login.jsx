import React, { useState } from "react";
import "./Login.scss";
import LoginPicture from "../../assets/login.jpg";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch(
        "http://localhost:5145/api/User/Login/login",
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const data = await response.json();
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error:", error.message);
      message.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="introduction-image">
        <img src={LoginPicture} alt="Login" />
      </div>

      <div className="login-form-container">
        <h2>Hello Again!</h2>
        <p>Welcome to Maverick</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <a href="/recovery-password" className="recovery-link">
              Recovery Password
            </a>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="login-options" >
          <button className="google-login-btn">
            <FontAwesomeIcon icon={faGoogle} style={{paddingTop:'0.1em'}} />
            Sign in with Google
          </button>
          <p>
            Don’t have an account yet?{" "}
            <a href="/sign-up" className="signup-link">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
