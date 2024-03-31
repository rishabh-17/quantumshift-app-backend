import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import ImageUploading from "react-images-uploading";

const CreateBlogPage = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    blog: "",
    thumbnail: "",
  });
  const [images, setImages] = useState([]);

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

  const maxNumber = 1;
  let modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const handleProcedureContentChange = (content) => {
    setContent(content);
  };

  const handleSave = () => {
    if (content && images?.[0]) {
      axios
        .post("/api/v1/blog/create", {
          blog: content,
          thumbnail: images?.[0],
          title: title,
          author: author,
        })
        .then(() => {
          alert("Success");
        })
        .catch((err) => {
          alert("Error: ");
        });
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <div className="bg-gray-100 p-4 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Create Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="mb-8">
          <label htmlFor="title" className="font-bold block mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={blogData.title}
            onChange={handleChange}
            className="border  bg-gray-100 border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="blog" className="font-bold block mb-2">
            Blog:
          </label>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            placeholder="Write your content..."
            onChange={handleProcedureContentChange}
            style={{ height: "400px" }}
          />
        </div>

        <div className="mb-8 mt-24">
          <h2 className="font-bold mb-2">Upload Thumbnail</h2>
          <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              <div className="upload__image-wrapper border rounded-xl p-4">
                {images.length === 0 ? (
                  <button
                    style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                    {...dragProps}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Click or Drop here
                  </button>
                ) : (
                  <button
                    onClick={onImageRemoveAll}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove Image
                  </button>
                )}
                {imageList?.map((image, index) => (
                  <div key={index} className="image-item grid gap-2">
                    <img
                      src={image["data_url"]}
                      alt=""
                      width="150"
                      className="rounded"
                    />
                    <div className="image-item__btn-wrapper">
                      <button
                        onClick={() => onImageUpdate(index)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => onImageRemove(index)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
