import axios from "axios";
import APIS from ".";

export const getData = async (userdata) =>
  await axios.get(`${APIS.Profile}/${userdata.user.id}`);
