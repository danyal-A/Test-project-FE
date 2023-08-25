import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Showpost from "./Showpost";
import suggest from "../Animations/animation_llnjya3j.json";
import Lottie from "react-lottie-player";
import Suggestion from "./Modals/Suggestion";
import axios from "axios";

const Post = (props) => {
  // console.log(props);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("loginuser"));
  const closemodal = () => {
    setModalIsOpen(false);
  };
  const handleProve = async (id) => {
    try {
      const post = await axios.put(`http://localhost:8800/api/posts/${id}`, {});
      console.log(post);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisapprove = async (id) => {
    try {
      const post = await axios.delete(
        `http://localhost:8800/api/posts/${id}`
      );
      // history(`/timeline/${postid.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userdata.user.role === "User" && props.status === true && (
        <div class="max-w-lg">
          <div class="bg-white shadow-md border ml-6 border-gray-200 rounded-lg max-w-sm mb-5">
            <a href="#">
              <img
                class="rounded-t-lg"
                src={props.Attachments[0].content}
                alt=""
              />
            </a>
            <div class="p-4">
              <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 no-underline">
                {props.title}
              </h5>
              <div className="block">
                <p class="font-normal text-gray-700 mb-3 text-ellipsis h-12 overflow-hidden">
                  {props.content}
                </p>
              </div>

              <div className="flex justify-between text-center align-middle">
                <Link
                  class=" bg-gray-900 text-gray-200 text-xs no-underline font-semibold rounded hover:bg-gray-800 px-3 py-2 text-center inline-flex items-center"
                  to={`/showpost/${props.id}`}
                  // onClick={e => handleReadMore(e)}
                >
                  Read more
                </Link>
                {/* <Lottie loop animationData={suggest} play height={36} /> */}
                {userdata.user.id !== props.UserId && (
                  <i
                    class="fa fa-plus fa-xl cursor-pointer"
                    aria-hidden="true"
                    onClick={() => setModalIsOpen(true)}
                  ></i>
                )}
              </div>
            </div>
            {modalIsOpen && (
              <Suggestion
                isOpen={modalIsOpen}
                onRequestClose={closemodal}
                user={props}
              />
            )}
          </div>
        </div>
      )}
      {userdata.user.role === "Moderator" && props.status === false && (
        <div class="max-w-lg">
          <div class="bg-white shadow-md border ml-6 border-gray-200 rounded-lg max-w-sm mb-5">
            <a href="#">
              <img
                class="rounded-t-lg"
                src={props.Attachments[0].content}
                alt=""
              />
            </a>
            <div class="p-4">
              <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 no-underline">
                {props.title}
              </h5>
              <div className="block">
                <p class="font-normal text-gray-700 mb-3 text-ellipsis h-12 overflow-hidden">
                  {props.content}
                </p>
              </div>

              <div className="flex text-center align-middle">
                <button
                  className=" text-white bg-red-500 p-2 rounded font-bold"
                  onClick={() => handleDisapprove(props.id)}
                >
                  Disaproved
                </button>
                <button
                  className=" text-white ml-2 bg-green-500 p-2 rounded font-bold"
                  onClick={() => handleProve(props.id)}
                >
                  Approved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
