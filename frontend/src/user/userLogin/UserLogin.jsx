import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { data, NavLink, useNavigate } from "react-router-dom";
import "../userLogin/UserLogin.css";
import { API } from "../../config";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const data = {
    email: email,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios({
        url: `${API}/user/login`,
        method: "post",
        data: data,
      });
      let token = result.data.token;
      let id = result.data.result.id;
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="main-div">
      <div className="main-div">
        <h1 className="login-title">Welcome Back </h1>
        <div>
          <Input
            label={"Email:"}
            value={email}
            id={"email"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label={"Password:"}
            value={password}
            type={"password"}
            id={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="remember-forgot">
          <NavLink id="forgot" to={"/user/forgot-password"}>
            Forgot Password?
          </NavLink>
        </div>

        <Button label="Login" />

        <div className="account">
          Don't have an account?
          <NavLink to={"/user/register"} className="sign">
            Sign Up
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default UserLogin;
