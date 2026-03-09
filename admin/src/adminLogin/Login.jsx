import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../adminLogin/Login.css";
import Button from "../component/button/Button";
import Input from "../component/input/Input";
import { api } from "../config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // let global = use(GlabalVariableContex);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    try {
      const result = await axios({
        url: `${api}/admin/login`,
        method: "post",
        data: data,
      });
      toast.success(result.data.message);
      localStorage.setItem("token", result.data.token);
      // global.setToken(result.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  const handlePassword = () => {
    navigate("/admin/forgot-password");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-main-div">
        <h1>Login</h1>
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
          <NavLink id="forgot" to={handlePassword}>
            Forgot Password?
          </NavLink>
        </div>
        <div>
          <Button label="log In" />
        </div>
        <div className="account">
          Don't have an account?
          <NavLink to={"/admin/register"} className="sign">
            Sign Up
          </NavLink>
        </div>
      </div>
    </form>
  );
};

export default Login;
