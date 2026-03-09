import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../component/backBtn/BackBtn";
import { API } from "../../config";
import "../myProfile/MyProfile.css";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  const getUser = async () => {
    const result = await axios({
      url: `${API}/user/my-profile`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUser(result.data.result);
  };

  useEffect(() => {
    getUser();
  }, []);
  const handleUpdate = () => {
    navigate("/user/update-profile");
  };
  const handleuser = () => {
    navigate("/user/my-profile");
  };
  return (
    <div className="main-div">
      <BackBtn label={"My Profile"} />
      <div className="profile-container-main">
        <div className="p-container">
          <button className="edit-btn" onClick={handleUpdate}>
            Edit
          </button>
          <div className="p-card">
            <div className="p-header">
              <img src={user.image} alt="Profile" className="p-pic" />
              <h2>{user.fullName}</h2>
            </div>
            <div className="p-section">
              <h3>Personal Information</h3>
              <div className="p-info">
                <strong>Name:</strong> {user.fullName}
              </div>
              <div className="p-info">
                <strong>Bio:</strong> {user.bio}
              </div>
              <div className="p-info">
                <strong>Gender:</strong> {user.gender}
              </div>
              <div className="p-info">
                <strong>Email:</strong> {user.email}
              </div>
              <div className="p-info">
                <strong>Phone:</strong> {user.phone}
              </div>
              <div className="p-info">
                <strong>Address:</strong> {user.address}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
