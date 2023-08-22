import { apiSlice } from "../../app/api/apiSlice";

export const blogsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      keepUnusedDataFor: 5,
      providesTags: ["Blogs"],
    }),
    getBlog: builder.query({
      query: (id) => `/blogs/${id}`,
      keepUnusedDataFor: 5,
    }),
    addBlog: builder.mutation({
      query: (blog) => ({
        url: "/blogs",
        method: "POST",
        body: blog,
      }),
      keepUnusedDataFor: 0,
      invalidatesTags: ["Blogs"],
    }),
    updateBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog._id}`,
        method: "PATCH",
        body: blog,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (blog) => ({
        url: `/blogs/${blog._id}`,
        method: "DELETE",
        body: blog._id,
      }),
      invalidatesTags: ["Blogs"],
      // keepUnusedDataFor: 1,
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogsApiSlice;
