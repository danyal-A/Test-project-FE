import React, { useEffect, useState } from "react";
import {
  addLikesComment,
  getCommentLikes,
  removeLikesComment,
} from "../Api/like";
import { getUser } from "../Api/user";

const Comments = (props) => {
  const [commentLikes, setCommentLikes] = useState("");
  const [userDetails, setUserDetails] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      const likes = await getCommentLikes(props.id);
      const user = await getUser(props.UserId);
      setUserDetails(user.data);
      setCommentLikes(likes.data);
      setIsLike(false);
    };
    fetchdata();
  }, [isLike]);

  const addLikeComment = async (commentid) => {
    try {
      if (!isFilled) {
        await addLikesComment(commentid, props.UserId);
        setIsFilled(!isFilled);
        setIsLike(true);
      } else {
        await removeLikesComment(commentid, props.UserId);
        setIsFilled(false);
        setIsLike(!isLike);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsFilled(true);
      } else {
        setIsFilled(!isFilled);
      }
    }
  };

  return (
    <div className="flex justify-between w-full px-6 py-2 mr-3 resize-none outline-none rounded appearance-none border mt-4">
      <div>
        <h1 className="font-bold text-sm">{userDetails.name}</h1>
        <p>{props.content}</p>
      </div>
      <div className="flex justify-between">
        <svg
          className="h-6 w-6 text-red-500 cursor-pointer"
          viewBox="0 0 24 24"
          fill={isFilled ? "red" : "none"}
          onClick={() => addLikeComment(props.id)}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        {/* <i className="fa fa-xl fa-bug ml-4" aria-hidden="true"></i> */}
        <p className="text-gray-400 ml-4">{commentLikes} likes</p>
      </div>
    </div>
  );
};

export default Comments;
