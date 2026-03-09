import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../readSpecificUser/ReadSpecificUser.css";
import { api } from "../../config";
import { IoIosArrowBack } from "react-icons/io";
// import { format } from "date-fns";

const ReadSpecificUser = () => {
  const [user, setuser] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  console.log(params.id);
  let token = localStorage.getItem("token");

  const getdata = async () => {
    const result = await axios({
      url: `${api}/user/${params.id}`,
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

  return (
    <div className="profile-page">
      <header className="profile-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h3>Profile</h3>
      </header>

      <div className="user-card">
        <div className="user-image-wrapper">
          <img src={user.image} alt={user.fullName} className="user-image" />
          <div className="image-overlay"></div>
        </div>

        <div className="user-content">
          <h1 className="ful-name"> {user.fullName}</h1>
          <p className="email">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadSpecificUser;
