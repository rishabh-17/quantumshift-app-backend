import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import firebase from "firebase/app";
import "firebase/storage";

const CreateBlogPage = () => {
  const [sectionData, setSectionData] = useState({
    title: "",
  });
  const [images, setImages] = useState([]);
  const [audio, setAudios] = useState([]);
  const [video, setVideos] = useState([]);

  const firebaseConfig = {
    apiKey: "import.meta.env.VITE_API_KEY",
    authDomain: "import.meta.env.VITE_AUTH_DOMAIN",
    projectId: "import.meta.env.VITE_PROJECT_ID",
    storageBucket: "import.meta.env.VITE_STORAGE_BUCKET",
    messagingSenderId: "import.meta.env.VITE_MESSAGING_SENDER_ID",
    appId: "import.meta.env.VITE_APP_ID",
  };

  const handleChange = (e) => {
    setSectionData({
      ...sectionData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadAudioToFirebase = (audioFile) => {
    const storageRef = firebase.storage().ref();
    const audioRef = storageRef.child(`audio/${audioFile.name}`);

    return audioRef
      .put(audioFile)
      .then((snapshot) => {
        console.log("Audio uploaded successfully");
        return snapshot.ref.getDownloadURL();
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
        return null;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sectionData);
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

  const uploadFileToFirebase = async (file) => {
    try {
      const storageRef = firebase.storage().ref();
      const audioRef = storageRef.child(`audio/${file.name}`);

      const snapshot = await audioRef.put(file);

      const downloadURL = await snapshot.ref.getDownloadURL();

      return downloadURL;
    } catch (error) {
      console.error("Error uploading audio file:", error);
      throw error;
    }
  };

  const handleSave = async () => {
    firebase.initializeApp(firebaseConfig);
    const files = e.target.files;
    const uploadPromises = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      uploadPromises.push(uploadAudioFile(file));
    }

    try {
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("Upload completed:", downloadURLs);
    } catch (error) {
      console.error("Error uploading audio files:", error);
    }
  };

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleAudioUpload = (e) => {
    const files = e.target.files;
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
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
            value={sectionData.title}
            onChange={handleChange}
            className="border  bg-gray-100 border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="my-8">
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

        <div className="my-8">
          <label className="block mb-2" for="file_input">
            <h2 className="font-bold mb-2">Upload Video</h2>
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleVideoUpload}
          />
        </div>

        <div className="my-8">
          <label className="block mb-2" for="file_input">
            <h2 className="font-bold mb-2">Upload Audio Files</h2>
          </label>
          <div className="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Audio Files
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                multiple
                className="hidden"
                onChange={handleAudioUpload}
              />
            </label>
          </div>
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
