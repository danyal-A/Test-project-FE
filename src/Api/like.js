import axios from "axios";

export const addLikes = async (postid, userid) => {
  const res = await axios.post("http://localhost:8800/api/like", {
    status: true,
    postid: postid,
    userid: userid,
  });
  return res;
};

export const getLikes = async (id) => {
  const res = await axios.get(`http://localhost:8800/api/like/${id}`);
  return res;
};

export const getCommentLikes = async (id) => {
  const res = await axios.get(`http://localhost:8800/api/like/comment/${id}`);
  return res;
};

export const addLikesComment = async (commentid, userid) => {
  const res = await axios.post("http://localhost:8800/api/like/comment", {
    status: true,
    commentid: commentid,
    userid: userid,
  });
  return res;
};

export const removeLikes = async (postid, userid) => {
  const res = await axios.delete(
    `http://localhost:8800/api/like/${postid}/likes/${userid}`
  );
  return res;
};
