import axios from "axios";
import APIS from ".";

export const getUser = async (id) => axios.get(`${APIS.user}/${id}`);
