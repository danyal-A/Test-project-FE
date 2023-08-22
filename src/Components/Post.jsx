import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Showpost from "./Showpost";

const Post = (props) => {

  // console.log(props);
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
            <Link
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
              to={`/showpost/${props.id}`}
              // onClick={e => handleReadMore(e)}
            >
              Read more
            </Link>
          </div>
         {/* {showpost && <Showpost title={props.title} content={props.content} attachment={props.Attachments[0].content} postid={props.id} />} */}
        </div>
      </div>
    </div>
  );
};

export default Post;
