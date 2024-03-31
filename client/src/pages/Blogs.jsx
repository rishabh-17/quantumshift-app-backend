import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        (import.meta.env.VITE_BACKEND_URL || "") + "/api/blogs"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(
        (import.meta.env.VITE_BACKEND_URL || "") + `/api/blogs/${id}`
      );
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
          <p className="text-gray-700">{blog.blog}</p>
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-md mt-2"
            onClick={() => deleteBlog(blog._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;
