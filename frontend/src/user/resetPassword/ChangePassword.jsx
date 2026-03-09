import React, { useState } from "react";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import axios from "axios";
import { API } from "../../config";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../component/backBtn/BackBtn";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        url: `${API}/user/change-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      navigate("/user/login");
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-div">
        <BackBtn label={"Change Password"} />
        <div>
          <Input
            type={"password"}
            value={oldPassword}
            label={"Old Password :"}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <Input
            type={"password"}
            value={newPassword}
            label={"New Password :"}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
        </div>
        <div>
          <Input
            type={"password"}
            value={confirmPassword}
            label={"Confirm Password :"}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>
        <Button label={"Update Password"} />
      </div>
    </form>
  );
};

export default ChangePassword;
