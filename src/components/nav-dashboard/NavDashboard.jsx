import React, { useState } from "react";
import "./NavDashboard.scss";
import navDashboardConfig, {
  navDashboardConfigAdmin,
  navDashboardConfigStaff,
} from "./config";
import { Link } from "react-router-dom";

function NavDashboard() {
  const [isActive, setIsActive] = useState(2);
  const user = useSelector(selectUser);
  return (
    <div className="dashboard-navigator">
      {navDashboardConfig(
        user.Role == "Admin"
          ? navDashboardConfigAdmin
          : user.Role == "Salon Manager"
          ? navDashboardConfig
          : user.Role == "Salon Staff"
          ? navDashboardConfuigStaff
          : null
      ).map((nav, index) => (
        <Link
          className={`dashboard-navigator__nav ${
            isActive == index ? "active" : ""
          }`}
          onClick={() => setIsActive(index)}
          to={nav.path}
          key={index}
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
}

export default NavDashboard;
