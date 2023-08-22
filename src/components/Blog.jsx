import React from "react";
import { Link } from "react-router-dom";

import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { useDeleteBlogMutation } from "../features/blogs/blogsApiSlice";

const Blog = ({ blog }) => {
  console.log(blog);
  const [deleteBlog] = useDeleteBlogMutation();
  return (
    <article className="flex justify-between border w-full h-12 items-center px-2">
      <Link
        className="w-full h-full flex items-center text-xl"
        to={`${blog._id}`}
      >
        <p>{blog.title}</p>
      </Link>
      <div className="flex gap-2 items-center border-l pl-2 h-full ">
        <Link to={`edit/${blog._id}`}>
          <FiEdit />
        </Link>

        <button onClick={() => deleteBlog(blog)}>
          <BsTrash />
        </button>
      </div>
    </article>
  );
};

export default Blog;
