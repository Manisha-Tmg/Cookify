import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../adminLogin/Login.css";
import Button from "../component/button/Button";
import DropZone from "../component/dropzone/DropZone";
import Input from "../component/input/Input";
import { api } from "../config";

const AdminForm = ({ type }) => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  let data = {
    fullName: fullName,
    email: email,
    password: password,
    image: image,
  };

  data = {
    ...data,
    role: "admin",
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios({
        url: `${api}/admin`,
        method: "post",
        data: data,
      });
      toast.success(result.data.message);
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-main-div">
        <h1>Sign up</h1>
        <div>
          <Input
            label={"Full Name:"}
            value={fullName}
            id={"fullname"}
            type="text"
            onChange={(e) => {
              setfullName(e.target.value);
            }}
          />
          <Input
            label={"Email:"}
            value={email}
            id={"email"}
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label={"Password:"}
            value={password}
            type="password"
            id={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <DropZone image={image} setImage={setImage} />
        </div>
        <div>
          <Button label="Sign Up" />
        </div>
      </div>
    </form>
  );
};

export default AdminForm;
