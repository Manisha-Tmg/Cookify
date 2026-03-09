import axios from "axios";
import React, { useEffect, useState } from "react";

import "../myProfile/MyProfile.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../config";
import Button from "../../component/button/Button";
import BackBtn from "../../component/backBtn/BackBtn";

const MyProfile = () => {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const getdata = async () => {
    const result = await axios({
      url: `${API}/user/my-profile`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setuser(result.data.result);
  };

  useEffect(() => {
    getdata();
  }, []);
  const handleUpdate = () => {
    navigate("/user/update-profile");
  };
  const handleRecipe = () => {
    navigate("/user/my-recipe");
  };
  const handleLogout = () => {
    {
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  };
  return (
    <div className="main-div">
      <BackBtn label={"My Profile"} />
      <div className="user-page">
        <div className="user-card">
          <div className="user-image-wrapper">
            <img src={user.image} alt={user.fullName} className="user-image" />
            <div className="image-overlay"></div>
          </div>

          <div className="user-content">
            <h1 className="ful-name">{user.fullName}</h1>
            <p className="email">{user.email}</p>
          </div>
          <Button label={"My Recipe"} onClick={handleRecipe}></Button>
          <Button label={"Update"} onClick={handleUpdate}></Button>
          <Button label={"Log Out"} onClick={handleLogout}></Button>
          {/* <B className="update-btn">Update</B> */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
