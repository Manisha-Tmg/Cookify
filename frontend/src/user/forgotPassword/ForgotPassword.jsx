import React from "react";
import Input from "../../component/input/Input";
import { useState } from "react";
import axios from "axios";
import { API } from "../../config";
import Button from "../../component/button/Button";
import { toast } from "react-toastify";
import BackBtn from "../../component/backBtn/BackBtn";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const data = {
    email: email,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios({
        url: `${API}/user/forgot-password`,
        method: "post",
        data: data,
      });
      setEmail("");
      toast.success(result.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-div">
        <h1>Forgot Password</h1>
        <div>
          <Input
            label={"Enter your email :"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <Button label={"Submit"} />
      </div>
    </form>
  );
};

export default ForgotPassword;
