import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { approvedPost, deletePosts } from "../../Api/post";
import Suggestion from "../Modals/Suggestion";

const Post = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const userdata = JSON.parse(localStorage.getItem("loginuser"));

  const closemodal = () => {
    setModalIsOpen(false);
  };

  const conditionCheck = (user, reported, status) => {
    return user === "Moderator" && reported === true && status === true;
  };

  const handleApprove = async (id) => {
    await approvedPost(id);
    props.fetchData();
    toast.success("Post approved successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleDisapprove = async (id) => {
    await deletePosts(id);
    props.fetchData();
    toast.error("Post deleted successfully!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <>
      {userdata.user.role === "User" && props.status === true && (
        <div className="max-w-lg">
          <div className="bg-white shadow-md border ml-6 border-gray-200 rounded-lg max-w-sm mb-5">
            <img
              className="rounded-t-lg"
              src={props.Attachments[0].content}
              alt=""
            />

            <div className="p-4">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 no-underline">
                {props.title}
              </h5>
              <div className="block">
                <p className="font-normal text-gray-700 mb-3 text-ellipsis h-12 overflow-hidden">
                  {props.content}
                </p>
              </div>

              <div className="flex justify-between text-center align-middle">
                <Link
                  class=" bg-gray-900 text-gray-200 text-xs no-underline font-semibold rounded hover:bg-gray-800 px-3 py-2 text-center inline-flex items-center"
                  to={`/showpost/${props.id}`}
                >
                  Read more
                </Link>
                {userdata.user.id !== props.UserId && (
                  <i
                    className="fa fa-plus fa-xl cursor-pointer"
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
        <div className="max-w-lg">
          <div className="bg-white shadow-md border ml-6 border-gray-200 rounded-lg max-w-sm mb-5">
            <a href="#">
              <img
                className="rounded-t-lg"
                src={props.Attachments[0].content}
                alt=""
              />
            </a>
            <div className="p-4">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 no-underline">
                {props.title}
              </h5>
              <div className="block">
                <p className="font-normal text-gray-700 mb-3 text-ellipsis h-12 overflow-hidden">
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
                  onClick={() => handleApprove(props.id)}
                >
                  Approved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {conditionCheck(userdata.user.role, props.isReported, props.status) && (
        <div className="max-w-lg">
          <div className="bg-white shadow-md border ml-6 border-gray-200 rounded-lg max-w-sm mb-5">
            <a href="#">
              <img
                className="rounded-t-lg"
                src={props.Attachments[0].content}
                alt=""
              />
            </a>
            <div className="p-4">
              <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 no-underline">
                {props.title}
              </h5>
              <div className="block">
                <p className="font-normal text-gray-700 mb-3 text-ellipsis h-12 overflow-hidden">
                  {props.content}
                </p>
              </div>

              <div className="flex text-center align-middle">
                <button
                  className=" text-white bg-red-500 p-2 rounded font-bold"
                  onClick={() => handleDisapprove(props.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
