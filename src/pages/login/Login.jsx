import React, { useState } from "react";
import "./Login.scss";
import LoginPicture from "../../assets/login.jpg";
import Logo from "../../assets/logo.png";
import { message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { jwtDecode } from "jwt-decode";
import { login } from "../../redux/features/counterSlice";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };
    try {
      const response = await api.post("/User/Login/login", payload);
      const token = response.data.data;
      localStorage.setItem("token", token);
      const user = jwtDecode(token);
      dispatch(login(user));
      if (user.Role === "Customer") {
        nav("/");
      }
      if (user.Role === "Admin") {
        nav("/dashboard");
      }
      if (user.Role === "Salon Manager") {
        nav("/dashboard/manager");
      }
      if (user.Role === "Salon Staff") {
        nav("/dashboard/staff");
      }
      if (user.Role === "Stylist") {
        nav("/dashboard/stylist");
      }
    } catch (error) {
      const errorMessage = error.response.data.data || "Login Failed." || message;
      message.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="introduction-image">
        <img
          src={LoginPicture}
          alt="Login"
          onClick={() => nav("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="login-form-container">
        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <img
            onClick={() => nav("/")}
            src={Logo}
            alt="Logo"
            style={{
              width: "18vw",
              height: "9vh",
              marginBottom: "1em",
              cursor: "pointer",
            }}
          />
        </div>
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
            <a href="/verify-mail" className="recovery-link">
              Recovery Password
            </a>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {/* {error && <p className="error-message">{error}</p>} */}
        </form>
        <div className="login-options">
          <button className="google-login-btn">
            <FontAwesomeIcon icon={faGoogle} style={{ paddingTop: "0.1em" }} />
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
