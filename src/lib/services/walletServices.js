import axiosInstance from "./axios";

export const getWallet = () => {
  const response = axiosInstance.get("/wallet");
  return response;
};

export const getTransactions = () => {
  const response = axiosInstance.get("/transactions");
  return response;
};
