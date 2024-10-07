import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const useAxios = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const axiosInstance = axios.create({
    baseURL: "https://attendance-server-jrbe.onrender.com/api/",
    // baseURL: "http://localhost:8000/api/",
    withCredentials: true,
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.data.message === "Logout True") {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
export default useAxios;
