import React, { useEffect, useState } from "react";

import { useAddBlogMutation } from "./blogsApiSlice";
import { useNavigate } from "react-router-dom";

const initState = {
  title: "",
  blog: "",
};

const NewBlog = () => {
  const [data, setData] = useState(initState);

  const navigate = useNavigate();

  const [addBlog] = useAddBlogMutation();

  // setData((prev) => ({ title: blogData.title, post: blogData.description }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addBlog(data);
    navigate("/blogs");
  };

  const handleChange = (e) => {
    const name = e.target.name;

    setData((prevData) => ({
      ...prevData,
      [name]: e.target.value,
    }));
  };
  return (
    <section className="flex min-h-screen min-w-full flex-col   prose prose-md  dark:prose-invert items-center  p-12">
      <h1 className="font-normal">Edit Post</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-5xl">
        <div className=" mb-6 flex flex-col gap-2">
          <label className=" font-medium text-xl" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            type="text"
            value={data?.title}
            onChange={handleChange}
            className="w-full bg-slate-700 h-12 text-emerald-300 text-lg p-2"
          />
        </div>

        <div className=" mb-6 flex flex-col gap-2">
          <label className=" font-medium text-xl" htmlFor="post">
            {" "}
            Blog Body
          </label>
          <textarea
            name="blog"
            onChange={handleChange}
            value={data.blog}
            className="w-full h-60  bg-slate-700 text-emerald-300 text-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[#aaffaa] text-black p-2 rounded-lg"
        >
          Submit
        </button>
        <button
          onClick={() => navigate("/blogs")}
          className="bg-[#ececec] text-black ml-4 p-2 rounded-lg"
        >
          Cancel
        </button>
      </form>
    </section>
  );
};

export default NewBlog;
