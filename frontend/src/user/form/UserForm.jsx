import { useEffect, useState } from "react";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackBtn from "../../component/backBtn/BackBtn";
import Button from "../../component/button/Button";
import DropZone from "../../component/dropzone/DropZone";
import Input from "../../component/input/Input";
import Radio from "../../component/radio/Radio";
import Textarea from "../../component/textArea/Textarea";
import { API } from "../../config";
import "../userLogin/UserLogin.css";

const UserForm = ({ type }) => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("female");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  console.log(params.id);
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
          url: `${API}/user/update-profile`,
          method: "patch",
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success(result.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.message);
    }
  };
  const handleNavigate = () => {
    navigate("/user/change-password");
  };

  const getData = async () => {
    const result = await axios({
      url: `${API}/user/my-profile`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setfullName(result.data.result.fullName);
    setEmail(result?.data.result.email);
    setImage(result?.data.result.image);
    setBio(result?.data.result.bio);
    setAddress(result?.data.result.address);
    setPhone(result?.data.result.phone);
    setGender(result?.data.result.gender);
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
          <div>
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
        ) : null}
        {type === "update" ? (
          <div>
            <BackBtn label={"Update Profile"} />
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
                label={"Phone:"}
                value={phone}
                type="text"
                id={"phone"}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />

              <Input
                label={"Address:"}
                value={address}
                type="text"
                id={"address"}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />

              <Textarea
                label={"Bio:"}
                value={bio}
                id={"bio"}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />

              <Radio
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              />
              <DropZone image={image} setImage={setImage} />
            </div>
            <div>
              <Button label="Update" />
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};

export default UserForm;
