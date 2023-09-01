import axios from "axios";
import APIS from "./index";

export const addAttachment = async (image, postid) =>
  axios.post(APIS.attachments, {
    photo: image,
    PostId: postid,
  });
