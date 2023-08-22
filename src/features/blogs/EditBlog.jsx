import React, { useEffect, useState } from "react";

import { useGetBlogQuery, useUpdateBlogMutation } from "./blogsApiSlice";
import { useParams, useNavigate } from "react-router-dom";

const initState = {
  title: "",
  description: "",
  _id: "",
  createdAt: "",
};

const EditBlog = () => {
  const [data, setData] = useState(initState);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blogData, isLoading, isError, error } = useGetBlogQuery(id);
  console.log(blogData);

  const [updateBlog] = useUpdateBlogMutation();

  // setData((prev) => ({ title: blogData.title, post: blogData.description }));

  useEffect(() => {
    setData(() => blogData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateBlog(data);
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
            name="description"
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
            }
            value={data?.description}
            className="w-full h-60  bg-slate-700 text-emerald-300 text-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-[#aaffaa] text-black p-2 rounded-lg"
        >
          Apply Changes
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

export default EditBlog;
