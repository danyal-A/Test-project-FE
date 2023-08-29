import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { createPost } from "../Api/post";
import { addAttachment } from "../Api/attachment";
const Createpost = () => {
  const history = useNavigate();
  const userid = useParams();
  const [image, setImage] = useState("");
  const [state, setState] = useState({
    title: "",
    content: "",
    UserId: userid.id,
  });
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };
  const getdata = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const hanndlecancel = () => {
    history(`/timeline/${userid.id}`);
  };
  const handlecreatepost = async (e) => {
    e.preventDefault();
    try {
      const res = await createPost(state);
      await addAttachment(image, res.data.id);
      toast.success("Request send to Moderator!");
      history(`/timeline/${userid.id}`);
    } catch (error) {
      if (error.response) {
        if (error.response.data.error === "Field is required") {
          toast.error("Field is required", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      }
      console.log(error);
    }
  };
  const uploadAttachment = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  return (
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input
          className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
          spellCheck="false"
          placeholder="Title"
          type="text"
          name="title"
          value={state.title}
          onChange={getdata}
        />
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          onChange={getdata}
          name="content"
          value={state.content}
        ></textarea>
        <div className="icons flex text-gray-500 m-2">
          <label htmlFor="file-input" className="cursor-pointer">
            <svg
              className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </label>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={(e) => uploadAttachment(e)}
            required
            accept="image/png, image/jpeg, image/jpg, image/jfif"
          />
        </div>
        <img className="w-16 h-16" src={image} alt="" />
        <div className="buttons flex">
          <button
            className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
            onClick={hanndlecancel}
          >
            Cancel
          </button>
          <button
            className="text-gray-800 rounded hover:bg-gray-900 hover:text-gray-100 hover:font-medium py-2 px-2 md:mx-2"
            onClick={(e) => handlecreatepost(e)}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Createpost;
