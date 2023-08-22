import Blog from "../../components/Blog";
import { useGetBlogsQuery } from "./blogsApiSlice";

import { Link } from "react-router-dom";
import { MdAdd } from "react-icons/md";

const BlogsList = () => {
  const {
    data: blogs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetBlogsQuery();

  console.log(blogs);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = (
      <section className="min-h-screen w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl">Blogs List</h1>
        <Link
          className="flex items-center text-2xl border text-[#aaffaa] border-[#aaffaa] mt-8 p-4 "
          to="/blogs/newBlog"
        >
          <MdAdd /> Add New Blog
        </Link>
        <ul className="flex flex-col gap-4 min-w-[300px] mt-4 mb-8 ">
          {blogs.map((blog) => (
            <li key={blog._id}>
              <Blog blog={blog} />
            </li>
          ))}
        </ul>
        <Link to="/main">Back to Home</Link>
      </section>
    );
  } else if (isError) {
    content = <p> {JSON.stringify(error)}</p>;
  }
  return content;
};

export default BlogsList;
