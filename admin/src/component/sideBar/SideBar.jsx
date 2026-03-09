import { IoIosLogOut } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import "./SideBar.css";

const SideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    {
      localStorage.removeItem("token");
      navigate("/admin/login");
    }
  };
  return (
    <nav className="admin-sidebar">
      <Logo />
      <p className="admin-menuu">Menu</p>
      <ul className="menu-list">
        <li className="menu-item">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dashboard
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/users">User Management</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/recipe">Recipe Management</NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/review">Review Management</NavLink>
        </li>
      </ul>
      <NavLink to={"/admin/login"}>
        <button className="admin-logout-button" onClick={handleLogout}>
          Logout <IoIosLogOut className="admin-logout-icon" />
        </button>
      </NavLink>
    </nav>
  );
};

export default SideBar;
