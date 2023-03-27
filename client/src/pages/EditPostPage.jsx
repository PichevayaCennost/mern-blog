import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/features/post/postSlice";

import axios from "../utils/axios";

const EditPostPage = () => {
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [oldImage, setOldImage] = React.useState("");
  const [newImage, setNewImage] = React.useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchPost = React.useCallback(async () => { 
    const { data } = await axios.get(`/posts/${id}`);

    setTitle(data.title);
    setText(data.text);
    setOldImage(data.imageUrl);
  }, [id]);

  React.useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', id)
      updatedPost.append('image', newImage)


      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('');
    setText('');
  }

  return (
    <form className="w-3/5 mx-auto p-10" onSubmit={(e) => e.preventDefault()}>
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение
        <input
          type="file"
          className="hidden"
          onChange={(e) => {
            setOldImage("");
            setNewImage(e.target.files[0]);
          }}
        ></input>
      </label>

      <div className="flex object-cover py-2">
        {oldImage && (
          <img
            src={`http://localhost:3002/${oldImage}`}
            alt="oldImage"
            className="border-4 border-solid border-gray-500"
          ></img>
        )}
        {newImage && (
          <img
            src={URL.createObjectURL(newImage)}
            alt="newImage"
            className="border-4 border-solid border-gray-500"
          ></img>
        )}
      </div>

      <label className="text-xs text-black opacity-70">
        Заголовок поста:
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Заголовок"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></input>
      </label>

      <label className="text-xs text-black opacity-70">
        Текст поста:
        <textarea
          value={text}
          placeholder="Текст поста"
          onChange={(e) => setText(e.target.value)}
          className="mt-1 h-40 resize-none text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        ></textarea>
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={submitHandler}
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Изменить
        </button>
        <button
          onClick={clearFormHandler}
          className="flex justify-center items-center bg-red-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default EditPostPage;
