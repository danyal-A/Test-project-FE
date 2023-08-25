import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Post";

const Action = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        //use of comments api for fetching comments
        const res = await axios.get("http://localhost:8800/api/posts/list");
        // console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-6 ">
      <h1 className="text-center font-bold text-4xl"> Posts</h1>
      <div className="grid grid-cols-4 mx-20 mt-10">
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Action;
