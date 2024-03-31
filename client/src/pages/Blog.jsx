import React, { useState } from "react";

const CreateBlogPage = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    blog: "",
    thumbnail: "",
  });

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(blogData);
  };

  return (
    <div className="bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-bold">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="blog" className="font-bold">
            Blog:
          </label>
          <textarea
            id="blog"
            name="blog"
            value={blogData.blog}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="thumbnail" className="font-bold">
            Thumbnail URL:
          </label>
          <input
            type="text"
            id="thumbnail"
            name="thumbnail"
            value={blogData.thumbnail}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
