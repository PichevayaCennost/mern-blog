import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { AiFillEye, AiOutlineComment } from "react-icons/ai";
import PostPage from "../pages/PostPage";

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        Постов не существует
      </div>
    );
  }
  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-frow border-2 border-solid rounded-lg">
        <div
          className={
            post.imageUrl ? "flex rounded-sm h-320 h-80 " : "flex rounded-sm"
          }
        >
          {post.imageUrl && (
            <img
              src={`http://localhost:3002/${post.imageUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="text-xs text-black opacity-50">{post.username}</div>
          <div className="text-xs text-black opacity-50">
            <Moment format="D MMM YYYY">{post.createdAt}</Moment>
          </div>
        </div>
        <div className="text-white text-xl">{post.title}</div>
        <p className="text-black opacity-60 text-xs pt-4">{post.text}</p>

        <div className="flex gap-3 items-center">
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye />
            <span>{post.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineComment />
            <span>{post.comments?.length || 0}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
