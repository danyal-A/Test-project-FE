import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Showpost from "./Showpost";
import suggest from "../Animations/animation_llnjya3j.json";
import Lottie from "react-lottie-player";
import Suggestion from "./Modals/Suggestion";

const Post = (props) => {
  // console.log(props);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("loginuser"));
  const closemodal = () => {
    setModalIsOpen(false);
  };
  const suggestContent = async () => {};
  return (
    <div>
      <div class="max-w-lg">
        <div class="bg-white shadow-md border ml-6 border-gray-200 rounded-lg max-w-sm mb-5">
          <a href="#">
            <img
              class="rounded-t-lg"
              src={props.Attachments[0].content}
              alt=""
            />
          </a>
          <div class="p-5">
            <a href="#">
              <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
                {props.title}
              </h5>
            </a>
            <p class="font-normal text-gray-700 mb-3">{props.content}</p>
            <div className="flex justify-between text-center align-middle">
              <Link
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
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
            <Suggestion isOpen={modalIsOpen} onRequestClose={closemodal} user={props} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
