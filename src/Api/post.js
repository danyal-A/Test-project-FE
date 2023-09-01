import axios from "axios";
import APIS from ".";

export const createPost = async (data) => await axios.post(APIS.Post, data);

export const getPosts = async () => await axios.get(`${APIS.Post}/list`);

export const getReported = async () => await axios.get(`${APIS.Post}/report`);

export const deletePosts = async (id) =>
  await axios.delete(`${APIS.Post}/${id}`);

export const reportedPost = async (id) =>
  await axios.put(`${APIS.Post}/report/${id}`);

export const postDetails = async (id) => await axios.get(`${APIS.Post}/${id}`);

export const approvedPost = async (id) =>
  await axios.put(`${APIS.Post}/${id}`, {});
