import React from "react";
import { useParams } from "react-router-dom";
import { useGetBlogQuery } from "./blogsApiSlice";
import ReactMarkdown from "react-markdown";
import "highlight.js/styles/github-dark.css";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight/lib";
const SingleBlog = () => {
  const { id } = useParams();
  const { data: blogData, isLoading, isError, error } = useGetBlogQuery(id);

  let content;

  if (isLoading) {
    console.log("no data");
    content = <p>Loadin...</p>;
  } else if (blogData) {
    content = (
      <article className=" max-w-5xl">
        <h1>{blogData.title}</h1>
        <ReactMarkdown
          children={blogData.description}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
        />
      </article>
    );
  } else {
    console.log("erroe");
    content = <p> {error}</p>;
  }

  return (
    <main className="flex min-h-screen min-w-full flex-col  prose prose-md  dark:prose-invert items-center  p-12">
      {content}
    </main>
  );
};

export default SingleBlog;
