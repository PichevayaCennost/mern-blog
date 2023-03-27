import React from "react";
import Moment from "react-moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillEye,
  AiOutlineComment,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { toast } from "react-toastify";

import axios from "../utils/axios";
import { removePost } from "../redux/features/post/postSlice";
import {
  createComment,
  getPostComments,
} from "../redux/features/comment/commentSlice";
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [post, setPost] = React.useState("");
  const [comment, setComment] = React.useState("");

  const { id } = useParams();

  const { user } = useSelector((state) => state.authSlice);
  const {comments} = useSelector( state => state.commentSlice);

  const fetchPost = React.useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`);
    setPost(data);
  }, []);

  const fetchComments = React.useCallback(async () => {
    try {
      dispatch(getPostComments(id));
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch]);

  React.useEffect( () => {
    fetchComments()
  }, [fetchComments])

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);


  const onClickRemove = () => {
    try {
      dispatch(removePost(id));
      toast("Пост был удален");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    try {
      const postId = id;
      dispatch(createComment({ postId, comment, user }));
      setComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Link to={"/"}>
        <button className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
          Назад
        </button>
      </Link>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imageUrl
                  ? "flex rounded-sm h-320 h-80 "
                  : "flex rounded-sm"
              }
            >
              {post?.imageUrl && (
                <img
                  src={`http://localhost:3002/${post.imageUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-black opacity-50">{post.username}</div>
            <div className="text-xs text-black opacity-50">
              <Moment format="D MMM YYYY">{post.createdAt}</Moment>
            </div>
          </div>
          <div className="text-white text-xl">{post.title}</div>
          <p className="text-black opacity-60 text-xs pt-4">{post.text}</p>

          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiFillEye />
                <span>{post.views}</span>
              </button>
              <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                <AiOutlineComment />
                <span>{post.comments?.length || 0}</span>
              </button>
            </div>
            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <Link to={`/${id}/edit`}>
                  <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                    <AiFillEdit />
                  </button>
                </Link>
                <button
                  onClick={onClickRemove}
                  className="flex items-center justify-center gap-2 text-xs text-white opacity-50"
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Comment"
              className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xd outline-none placeholder:text-gray-700"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button
              // type="submit"
              className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </form>
          {
            comments?.map( comment => (
              <CommentItem comment={comment} key={comment._id}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};
