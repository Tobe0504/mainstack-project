import { BASE_API_URL } from "../config";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((axiosConfig) => {
  if (!navigator.onLine) {
    throw new Error("Please check your internet connection");
  }

  return axiosConfig;
});

axiosInstance.interceptors.response.use((response) => {
  if (response?.status === 200 || response?.status === 201) {
    return response;
  } else {
    throw new Error(response?.data?.error?.message);
  }
});

export default axiosInstance;
