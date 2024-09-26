import React from "react";
import Logo from "../logo/Logo";
import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <div>
        <Logo />
        <Link to="/login">
          Login
        </Link>
        <Link to="/sign-up">
          Sign up
        </Link>
      </div>
    </>
  );
}

export default Header;
