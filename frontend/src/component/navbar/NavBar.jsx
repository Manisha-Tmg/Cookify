import { data, Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import "../navbar/NavBar.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../config";

const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [email, setEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let token = localStorage.getItem("token");
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const getData = async () => {
    try {
      const result = await axios({
        url: `${API}/user/my-profile`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileImage(result.data.result.image);
      setEmail(result.data.result.email);
    } catch (error) {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      getData();
    }
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     setIsLogin(true);
  //     getData();
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, [token]);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleLogout = () => {
    {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      navigate("/user/login");
      setIsLogin(false);
    }
  };

  return (
    <section>
      <nav className="navbar">
        <Logo />
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/recipe"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Recipes
            </NavLink>
          </li>
          {isLogin ? (
            <li>
              <NavLink
                to="/recipe/add-recipe"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Add Recipe
              </NavLink>
            </li>
          ) : null}

          <li>
            <NavLink
              to="user/about-us"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              About Us
            </NavLink>
          </li>
        </ul>
        <div className="nav-profile-section">
          {isLogin ? (
            <div className="nav-avatar-container relative" ref={dropdownRef}>
              <div className="nav-avatar-wrapperr">
                <div className="nav-avatarr" onClick={toggleDropdown}>
                  <img src={profileImage} alt="Img" className="nav-imgg" />
                </div>
              </div>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <p className="dropdown-header">
                    Signed in as <br /> <strong>{email}</strong>
                  </p>
                  <NavLink
                    to="user/my-profile"
                    className="dropdown-item logout"
                  >
                    My Profile
                  </NavLink>
                  <Link
                    to="user/change-password"
                    className="dropdown-item logout"
                  >
                    Change Password
                  </Link>
                  <NavLink
                    to={`/user/my-recipe`}
                    className="dropdown-item logout"
                  >
                    My Recipe
                  </NavLink>
                  <NavLink
                    to={`/user/my-recipe`}
                    className="dropdown-item logout"
                  >
                    My Review
                  </NavLink>
                  <p onClick={handleLogout} className="dropdown-item logout">
                    Log Out
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink to="user/login">
                <button className="btn">Log in</button>
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};

export default NavBar;
