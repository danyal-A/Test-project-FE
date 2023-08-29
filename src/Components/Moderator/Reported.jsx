import React, { useCallback, useEffect, useState } from "react";
import NavbarM from "./NavbarM";
import Post from "../Post";
import { getReported } from "../../Api/post";

const Reported = () => {
  const [posts, setPosts] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const res = await getReported();
      console.log("res", res.data);
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    fetchData();
  }, []);
  console.log(posts);
  return (
    <div>
      <NavbarM />
      {posts.length ? (
        <div>
          <h1 className="text-center font-bold text-4xl mt-2">
            Reporting Posts
          </h1>
          {posts.map((post, index) => (
            <Post key={index} {...post} fetchData={fetchData} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h4 className="text-gray-500">None of post is reported yet!</h4>
        </div>
      )}
    </div>
  );
};

export default Reported;
