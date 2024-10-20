import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./SideNav.scss";
import { logout, selectUser } from "../../../../redux/features/counterSlice";
import { AiOutlineLogout } from "react-icons/ai";
import navDashboardConfig, {
  navDashboardConfigAdmin,
  navDashboardConfigStaff,
  navDashboardConfigStylist,
  navpath,
} from "../../../../components/nav-dashboard/config";
import { useDispatch, useSelector } from "react-redux";

function SideNav({}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pathname.replace("/", "");
  const dispatch = useDispatch();
  const onClick = (e) => {
    navigate(navpath[e.key].path);
  };
  const user = useSelector(selectUser);
  const handleLogout = async () => {
    localStorage.removeItem('token')
    await dispatch(logout())
    navigate('/')
}
  return (
    

<div className="menu-side-nav-container">
      <Menu
        onClick={onClick}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={
          user.Role == "Salon Manager"
            ? navDashboardConfig
            : user.Role == "Admin"
            ? navDashboardConfigAdmin
            : user.Role == "Salon Staff"
            ? navDashboardConfigStaff
            : user.Role == "Stylist"
            ? navDashboardConfigStylist
            : null
        }
        className="menu-sidenav"
      />
      <div className="logout-container" onClick={handleLogout}>
        <AiOutlineLogout style={{ fontSize: "1em", marginTop:'0.15em' }} />
        <span style={{ paddingLeft: "0.3em", fontSize:'0.9em'} }>Logout</span>
      </div>
    </div>
  );
}

export default SideNav;
