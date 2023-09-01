import axios from "axios";
import APIS from ".";

export const addLikes = async (postid, userid) => {
  const res = await axios.post(APIS.Like, {
    status: true,
    postid: postid,
    userid: userid,
  });
  return res;
};

export const getLikes = async (id) => {
  const res = await axios.get(`${APIS.Like}/${id}`);
  return res;
};

export const getCommentLikes = async (id) => {
  const res = await axios.get(`${APIS.Like}/comment/${id}`);
  return res;
};

export const addLikesComment = async (commentid, userid) => {
  const res = await axios.post(`${APIS.Like}/comment`, {
    status: true,
    commentid: commentid,
    userid: userid,
  });
  return res;
};

export const removeLikes = async (postid, userid) => {
  const res = await axios.delete(
    `${APIS.Like}/${postid}/likes/${userid}`
  );
  return res;
};

export const removeLikesComment = async (commentid, userid) =>{
  const res = await axios.delete(
    `${APIS.Like}/${commentid}/likes/${userid}`
  );
  return res;
}
