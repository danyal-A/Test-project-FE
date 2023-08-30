import axios from "axios";

export const createPost = async (data) => {
  const res = await axios.post("http://localhost:8800/api/posts", data);
  return res;
};

export const getPosts = async () => {
  const res = await axios.get("http://localhost:8800/api/posts/list");
  return res;
};

export const getReported = async () => {
  const res = await axios.get("http://localhost:8800/api/posts/report");
  return res;
};

export const deletePosts = async (id) => {
  const res = await axios.delete(`http://localhost:8800/api/posts/${id}`);
  return res;
};

export const reportedPost = async (id) => {
  const res = await axios.put(`http://localhost:8800/api/posts/report/${id}`);
  return res;
};

export const postDetails = async (id) => {
  const res = axios.get(`http://localhost:8800/api/posts/${id}`);
  return res;
};

export const approvedPost = async (id) => {
  const res = await axios.put(`http://localhost:8800/api/posts/${id}`, {});
  return res;
};
