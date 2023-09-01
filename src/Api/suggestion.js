import axios from "axios";
import APIS from ".";

export const createSuggestion = async (id, content, userid) =>
  await axios.post(`${APIS.suggestions}/${id}`, {
    content: content,
    isProved: false,
    userid: userid,
    reply: "reply",
  });

export const getSuggestion = async (id) =>
  await axios.get(`${APIS.suggestions}/${id}`);

export const modifySuggestion = async (postid, content) =>
  await axios.put(`${APIS.suggestions}/${postid}`, {
    content: content,
  });

export const deleteSuggestion = async (id) =>
  await axios.delete(`${APIS.suggestions}/${id}`);
