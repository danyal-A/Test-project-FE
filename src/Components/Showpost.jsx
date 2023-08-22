import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarT from "./NavbarT";

const Showpost = (props) => {
  const postid = useParams();
  const [textComment, setTextcomment] = useState("");
  const [comments, setComments] = useState([]);
  const [details, setDetails] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const postDetails = await axios.get(
          `http://localhost:8800/api/posts/${postid.id}`
        );
        console.log(postDetails);
        setDetails(postDetails.data);
        // setComments(postDetails.data.comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);
  //   console.log(details);
  const handleAddComment = () => {
    try {
      const comment = axios.post(
        `http://localhost:8800/api/comments/${postid.id}`,
        {
          postid: postid,
          content: textComment,
        }
      );
      console.log(comment);
      setTextcomment("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavbarT />
      {details && (
        <section className="bg-white">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl">
              {details?.title}
            </h1>

            <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
              <img
                className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                src={details?.Attachments[0].content}
                alt=""
              />

              <div className="lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <p className="text-gray-950">{details?.content}</p>

                <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                  veritatis sint autem nesciunt, laudantium quia tempore delect
                </p>

                <div className="flex items-center mt-6">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    alt=""
                  />

                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 dark:text-gray-200">
                      Amelia. Anderson
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Lead Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-4 pb-1 pr-3">
              <div class="flex items-start">
                <textarea
                  className="w-full px-6 py-2 mr-3 resize-none outline-none rounded appearance-none"
                  placeholder="Write Comment ...."
                  autocomplete="off"
                  autocorrect="off"
                  value={textComment}
                  style={{ height: "40px" }}
                  onChange={(e) => setTextcomment(e.target.value)}
                ></textarea>
                <button
                  class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
                  onClick={handleAddComment}
                >
                  Add
                </button>
              </div>
            </div>
            {details.comments.map((comment) => (
              <div className="w-full px-6 py-2 mr-3 resize-none outline-none rounded appearance-none border mt-4">
                <h1>{comment.content}</h1>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Showpost;
