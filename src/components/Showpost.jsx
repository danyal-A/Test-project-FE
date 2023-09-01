import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarT from "./common/NavbarT";
import Comments from "./Comments";
import { toast } from "react-toastify";
import { addComment } from "../Api/comment";
import { deletePosts, postDetails, reportedPost } from "../Api/post";
import { addLikes, getLikes, removeLikes } from "../Api/like";

const Showpost = () => {
  const userdata = JSON.parse(localStorage.getItem("loginuser"));
  const [isFilled, setIsFilled] = useState(false);
  const history = useNavigate();
  const [isCommented, setIsCommented] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const postid = useParams();
  const [likes, setLikes] = useState("");
  const [textComment, setTextcomment] = useState("");
  const [details, setDetails] = useState("");

  const fetchdata = useCallback(async () => {
    try {
      const postDetail = await postDetails(postid.id);
      const likes = await getLikes(postid.id);
      setLikes(likes.data);
      setIsLike(false);
      setIsCommented(false);
      setDetails(postDetail.data);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchdata();
  }, [isLike, isCommented]);

  const handleReported = async (id) => {
    await reportedPost(id);
    toast.success("Successfully reported!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleAddComment = async () => {
    try {
      await addComment(postid.id, textComment, userdata.user.id);
      toast.success("Comment added successfully!!");
      setIsCommented(true);
      setTextcomment("");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data.error);
          console.log(error);
        }
      }
    }
  };

  const deletePost = async () => {
    await deletePosts(postid.id);
    toast.success("Post Deleted successfully!");
    history(`/timeline/${postid.id}`);
  };

  const addLike = async () => {
    try {
      if (!isFilled) {
        await addLikes(postid.id, userdata.user.id);
        setIsFilled(!isFilled);
        setIsLike(true);
      } else {
        await removeLikes(postid.id, userdata.user.id);
        setIsFilled(false);
        setIsLike(!isLike);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setIsFilled(true);
      } else {
        setIsFilled(!isFilled);
      }
    }
  };

  return (
    <div>
      <NavbarT userid={userdata.user.id} />
      {details && (
        <section className="bg-white">
          <div className="container px-6 py-10 mx-auto">
            <div className="flex justify-between align-middle text-center">
              <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
                {details?.title}
              </h1>
              {userdata.user.id === details.UserId && (
                <i
                  className="fa fa-trash fa-2xl cursor-pointer"
                  aria-hidden="true"
                  onClick={deletePost}
                ></i>
              )}
            </div>
            <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
              <img
                className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                src={details?.Attachments[0].content}
                alt=""
              />

              <div className="lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-gray-950">{details?.content}</p>

                <div className="flex align-middle text-center mt-6">
                  <svg
                    className="h-6 w-6 text-red-500  cursor-pointer"
                    viewBox="0 0 24 24"
                    fill={isFilled ? "red" : "none"}
                    onClick={addLike}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {userdata.user.id !== details.UserId && (
                    <i
                      className="fa fa-xl fa-bug ml-4 cursor-pointer"
                      aria-hidden="true"
                      onClick={() => handleReported(details.id)}
                    ></i>
                  )}
                </div>
                <p className="text-gray-400 mt-4">{likes} likes</p>
              </div>
            </div>
            <div className="pt-4 pb-1 pr-3">
              <div className="flex items-start">
                <textarea
                  className="w-full px-6 py-2 mr-3 resize-none outline-none rounded appearance-none"
                  placeholder="Write Comment ...."
                  autoComplete="off"
                  autoCorrect="off"
                  value={textComment}
                  style={{ height: "40px" }}
                  onChange={(e) => setTextcomment(e.target.value)}
                ></textarea>
                <button
                  className="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
                  onClick={handleAddComment}
                >
                  Add
                </button>
              </div>
            </div>
            {details.comments.map((comment, index) => (
              <Comments key={index} {...comment} userdata={userdata} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Showpost;
