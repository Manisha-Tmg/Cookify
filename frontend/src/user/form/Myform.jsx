import React, { useEffect, useState } from "react";

import axios, { Axios } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../userLogin/UserLogin.css";
import { API } from "../../config";
import Input from "../../component/input/Input";
import Button from "../../component/button/Button";
import DropZone from "../../component/dropzone/DropZone";
import BackBtn from "../../component/backBtn/BackBtn";

const MyForm = ({ type }) => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  const data = {
    fullName: fullName,
    email: email,
    password: password,
    image: image,
    gender: gender,
    phone: phone,
    address: address,
    bio: bio,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "create") {
        const result = await axios({
          url: `${API}/user`,
          method: "post",
          data: data,
        });
        toast.success(result.data.message);
        navigate("/user/login");
      } else {
        const result = await axios({
          url: `${API}/user/${params.id}`,
          method: "patch",
          data: data,
        });
        toast.success(result.data.message);
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const handleNavigate = () => {
    navigate("/user/change-password");
  };

  const getData = async () => {
    const result = await axios({
      url: `${API}/user/${params.id}`,
    });
    setfullName(result.data.result.fullName);
    setEmail(result.data.result.email);
    setImage(result.data.result.image);
    setBio(result.data.result.bio);
    setAddress(result.data.result.address);
    setPhone(result.data.result.phone);
    setGender(result.data.result.gender);
  };
  useEffect(() => {
    if (type === "update") {
      getData();
    }
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <div className="main-div">
        {type === "create" ? (
          <h1>Sign up</h1>
        ) : (
          <BackBtn label={"Update Profile"} />
        )}
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
        </div>
        <div>
          <Input
            label={"Email:"}
            value={email}
            id={"email"}
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {type === "create" ? (
          <div>
            {" "}
            <div>
              <Input
                label={"Password:"}
                value={password}
                type="password"
                id={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>{" "}
            <div>
              <Input
                label={"Password:"}
                value={password}
                type="password"
                id={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>{" "}
            <div>
              <Input
                label={"Password:"}
                value={password}
                type="password"
                id={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>{" "}
            <div>
              <Input
                label={"Password:"}
                value={password}
                type="password"
                id={"password"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
        ) : null}
        <div>
          <DropZone image={image} setImage={setImage} />
        </div>
        <div>
          {type === "create" ? (
            <div>
              <Button label="Sign Up" />
            </div>
          ) : (
            <div>
              <Button label="Update Profile " />
              <Button label="Change Password" onClick={handleNavigate} />
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default MyForm;
