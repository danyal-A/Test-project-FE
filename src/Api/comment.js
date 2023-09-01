import axios from "axios";
import APIS from "./index";

export const addComment = async (postid, content, userid) =>
  axios.post(`${APIS.addComment}/${postid}`, {
    postid: postid,
    content: content,
    userid: userid,
  });
