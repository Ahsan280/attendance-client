import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const api = useAxios();
  const { setUser } = useAuthContext();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await api.post("v1/users/login", { email, password });
      await setUser(jwtDecode(response.data.accessToken));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      if (jwtDecode(response.data.accessToken).isManager) {
        navigate("/manager-dashboard");
      } else {
        navigate("/user-dashboard");
      }

      Swal.fire({
        title: "Logged In Successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      console.error(error.response.data.error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setLoading(false);
  };
  return { login, loading };
};
export default useLogin;
