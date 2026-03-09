import React, { useState } from "react";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import axios from "axios";
import { API } from "../../config";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const token = query.get("token");
  const data = {
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        url: `${API}/user/reset-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(result.data.message);
      navigate("/user/login");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-div">
        <h1>Reset Password</h1>
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
        <Button label={"Reset Password"} />
      </div>
    </form>
  );
};

export default ResetPassword;
