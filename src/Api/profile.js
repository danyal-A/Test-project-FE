import axios from "axios";

export const getData = async (userdata) => {
  const res = await axios.get(
    `http://localhost:8800/api/users/${userdata.user.id}`
  );
  return res;
};
