import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <Link to="/" className="wrapper-black">
      <img src={logo} />
    </Link>
  );
}

export default Logo;
