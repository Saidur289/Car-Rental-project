import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
const axiosInstance = axios.create({
  baseURL: "https://car-rental-server-alpha.vercel.app",
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { handleSignOut } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log("error cought in the interceptors", error);
        if (error.status === 401 || error.status === 401) {
        //   console.log("log out the user");
          handleSignOut().then(() => {
            // console.log("sign out user");
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);
  return axiosInstance;
};

export default useAxiosSecure;
