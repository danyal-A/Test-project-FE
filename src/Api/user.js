import axios from "axios";

export const getUser = async (id) => {
  const res = await axios.get(`http://localhost:8800/api/users/${id}`);
  return res;
};
