import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { API } from "../../config";

const VerifyUser = () => {
  let [query] = useSearchParams();
  let token = query.get("token");
  const navigate = useNavigate();
  const verifyUser = async (e) => {
    try {
      await axios({
        url: `${API}/user/verify-user`,
        method: "patch",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/user/login");
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  };
  useEffect(() => {
    verifyUser();
  }, []);
  return <div>VerifyUser</div>;
};

export default VerifyUser;
