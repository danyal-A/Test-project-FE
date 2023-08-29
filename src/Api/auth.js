import axios from "axios";

export const registerUser = async (userData) => {
  const res = await axios.post(
    "http://localhost:8800/api/auth/register",
    userData
  );
  return res.data;
};

export const loginUser = async (userData) => {
    console.log(userData);
  const res = await axios.post(
    "http://localhost:8800/api/auth/login",
    userData
  );
  return res;
};
