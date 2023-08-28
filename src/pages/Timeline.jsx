import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Post from "../Components/Post";
import NavbarT from "../Components/NavbarT";

const Timeline = () => {
  const userid = useParams();
  const [posts, setPosts] = useState([]);
  // console.log(userid);
  const fetchData = useCallback(async () => {
    try {
      //use of comments api for fetching comments
      const res = await axios.get("http://localhost:8800/api/posts/list");
      // console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  console.log(posts);
  return (
    <div>
      <div className="w-full">
        <NavbarT userid={userid} fetchData={fetchData} />
        <div className="flex bg-white" style={{ height: "600px" }}>
          <div className="flex items-center text-left px-8 md:px-12 lg:w-1/2">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
                Build Your New <span className="text-indigo-600">Idea</span>
              </h2>
              <p className="mt-2 text-sm text-gray-500 md:text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis commodi cum cupiditate ducimus, fugit harum id
                necessitatibus odio quam quasi, quibusdam rem tempora
                voluptates. Cumque debitis dignissimos id quam vel!
              </p>
              <div className="flex justify-center lg:justify-start mt-6">
                <Link
                  className="px-4 py-3 bg-gray-900 text-gray-200 text-xs no-underline font-semibold rounded hover:bg-gray-800"
                  to={`/createpost/${userid.id}`}
                >
                  Create Blog
                </Link>
              </div>
            </div>
          </div>
          <div
            className="hidden lg:block lg:w-1/2"
            style={{
              clipPath: "polygon(10% 0, 100% 0%, 100% 100%, 0 100%)",
              // Other styles...
            }}
          >
            <div
              className="h-full object-cover"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)",
                // Other styles...
              }}
            >
              <div className="h-full bg-black opacity-25"></div>
            </div>
          </div>
        </div>
        <div className="mt-6 ">
          <h1 className="text-center font-bold text-4xl"> Posts</h1>
          <div className="grid grid-cols-4 mx-20 mt-10">
            {posts.map((post, index) => (
              <Post key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
