import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaBell,
  FaBookmark,
  FaCalendarAlt,
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";
import "../sideBar/SideBar.css";

import { Link, useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      path: "/setting/Dashboard",
      icon: <FaHome className="menu-icon" />,
      label: "Dashboard",
    },

    {
      path: "/setting/Caretaker",
      icon: <FaBookmark className="icon" />,
      label: "Caretakers",
    },

    {
      path: "/setting/Users",
      icon: <FaBell className="icon" />,
      label: "Users",
    },
    {
      path: "/setting/bookings",
      icon: <FaCalendarAlt className="menu-icon" />,
      label: "Bookings",
    },
  ];

  return (
    <div className="setting-sidebar">
      <div className="setting-sidebar-header">
        <div className="setting-header-content">
          <h2 className="setting-user-name">{data.role ?? "Setting"}</h2>
        </div>
      </div>

      <div className="setting-sidebar-content">
        <nav className="setting-sidebar-nav">
          <ul className="setting-menu-list">
            {menuItems.map((item, index) => (
              <li key={index} className="setting-menu-item">
                <Link
                  to={item.path}
                  className={`setting-menu-link ${
                    isActive(item.path) ? "active" : ""
                  }`}
                >
                  <span className="setting-icon-wrapper">{item.icon}</span>
                  <span className="setting-menu-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        {/* <Link to={"/setting/login/"} style={{ textDecoration: "none" }}> */}
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="menu-icon" />
          <span className="logout-text">Log Out</span>
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SideBar;
