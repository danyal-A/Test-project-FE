import axios from "axios";

export const addComment = async (postid, content, userid) => {
  await axios.post(`http://localhost:8800/api/comments/${postid}`, {
    postid: postid,
    content: content,
    userid: userid,
  });
};
