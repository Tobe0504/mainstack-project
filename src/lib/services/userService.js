import axiosInstance from "./axios";

export const getUser = () => {
  const response = axiosInstance.get("/user");
  return response;
};
