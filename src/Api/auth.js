import axios from "axios";
import APIS from "./index";

export const registerUser = async (userData) => {
  const res = await axios.post(APIS.signUp, userData);
  return res.data;
};

export const loginUser = async (userData) =>
  await axios.post(APIS.signIn, userData);
