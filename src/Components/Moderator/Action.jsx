import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Post from "../Post";
import NavbarM from "./NavbarM";
import { useParams } from "react-router-dom";

const Action = () => {
  const [posts, setPosts] = useState([]);
  const userid = useParams();
  const fetchData = useCallback(async () => {
    try {
      //use of comments api for fetching comments
      const res = await axios.get("http://localhost:8800/api/posts/list");
      // console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <NavbarM userid={userid.id} />
      {posts.length ? (
        <div className="mt-6 ">
          <h1 className="text-center font-bold text-4xl">Pending Posts</h1>
          <div className="grid grid-cols-4 mx-20 mt-10">
            {posts.map((post, index) => (
              <Post key={index} {...post} fetchData={fetchData} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-center font-bold text-4xl">Pending Posts</h1>
          <div className="flex items-center justify-center h-screen">
            <h4 className="text-gray-500">None of post is pending yet!</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Action;
