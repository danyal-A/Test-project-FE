import axios from "axios";

export const addAttachment = async (image, postid) => {
  const res = await axios.post("http://localhost:8800/api/attachment/", {
    photo: image,
    PostId: postid,
  });
  return res;
};
