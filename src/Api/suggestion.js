import axios from "axios";

export const createSuggestion = async (id, content, userid) => {
  const res = await axios.post(`http://localhost:8800/api/suggestion/${id}`, {
    content: content,
    isProved: false,
    userid: userid,
    reply: "reply",
  });
  return res;
};

export const getSuggestion = async (id) => {
  const res = await axios.get(`http://localhost:8800/api/suggestion/${id}`);
  return res;
};

export const modifySuggestion = async (postid, content) => {
  const res = await axios.put(
    `http://localhost:8800/api/suggestion/${postid}`,
    {
      content: content,
    }
  );
  return res;
};

export const deleteSuggestion = async (id) => {
  const res = await axios.delete(`http://localhost:8800/api/suggestion/${id}`);
  return res;
};
