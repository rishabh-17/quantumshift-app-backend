import React, { useState } from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import * as firebase from "firebase/app";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCS3OplXTOApyiGQnhizLbw_UQybFGkEBk",
  authDomain: "quantum-shift-64a8a.firebaseapp.com",
  projectId: "quantum-shift-64a8a",
  storageBucket: "quantum-shift-64a8a.appspot.com",
  messagingSenderId: "288104995290",
  appId: "1:288104995290:web:28525cc1a5f6489f4908e3",
  measurementId: "G-6NKJKW9Y5Z",
};

firebase.initializeApp(firebaseConfig);

const CreateSectionPage = () => {
  const [sectionData, setSectionData] = useState({
    title: "",
  });
  const [image, setImage] = useState([]);
  const [audios, setAudios] = useState([]);
  const [video, setVideo] = useState([]);
  const storage = getStorage();

  const handleUploadFiles = () => {
    const uploaded = {
      audios: [],
      image: "",
      video: "",
    };
    if (image[0] && audios && video) {
      const imageUploadPromise = new Promise((resolve, reject) => {
        const imgref = ref(storage, `images/${image?.[0].file.name}`);
        uploadBytes(imgref, image?.[0]?.file)
          .then((i) => {
            getDownloadURL(i.ref).then((url) => {
              uploaded.image = url;
              resolve(); // Resolve the promise when image upload is complete
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err); // Reject the promise if there's an error
          });
      });

      const audioUploadPromises = Array.from(audios).map((audio) => {
        return new Promise((resolve, reject) => {
          const audref = ref(storage, `audios/${audio.name}`);
          uploadBytes(audref, audio)
            .then((i) => {
              getDownloadURL(i.ref).then((url) => {
                uploaded.audios.push(url);
                resolve(); // Resolve the promise when audio upload is complete
              });
            })
            .catch((err) => {
              console.log(err);
              reject(err); // Reject the promise if there's an error
            });
        });
      });

      const videoUploadPromise = new Promise((resolve, reject) => {
        const vidref = ref(storage, `videos/${video?.name}`);
        uploadBytes(vidref, video)
          .then((i) => {
            getDownloadURL(i.ref).then((url) => {
              uploaded.video = url;
              resolve(); // Resolve the promise when video upload is complete
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err); 
          });
      });


      Promise.all([
        imageUploadPromise,
        ...audioUploadPromises,
        videoUploadPromise,
      ])
        .then(() => {
        
          console.log("All uploads completed", uploaded);

        })
        .catch((err) => {
          console.log(err);
          alert("Error uploading files");
        });
    }
  };

  const handleChange = (e) => {
    setSectionData({
      ...sectionData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(sectionData);
  };

  const maxNumber = 1;
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
    const payload = {
      thumbnail: "",
      video: "",
      audios: [],
      title: "",
    };
    console.log(audios, image, video);

    const uploadPromises = [];
    for (let i = 0; i < audios.length; i++) {
      const file = audios[i];
      uploadPromises.push(uploadFileToFirebase(file));
    }

    uploadPromises.push(uploadFileToFirebase(image[0].data_url));
    uploadPromises.push(uploadFileToFirebase(video));
    console.log(uploadPromises);
    try {
      const downloadURLs = await Promise.all(uploadPromises);
      console.log("Upload completed:", downloadURLs);
    } catch (error) {
      console.error("Error uploading audio files:", error);
    }
  };


  const onChange = (imageList, addUpdateIndex) => {
    setImage(imageList);
  };

  const handleAudioUpload = (e) => {
    const files = e.target.files;
    setAudios((prevAudios) => [...prevAudios, ...files]);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const removeAudio = (index) => {
    setAudios((prevAudios) =>
      prevAudios.filter((audio, i) => i !== index)
    );
  };

  return (
    <div className="bg-gray-100 p-4 w-[80%] mx-auto">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
        Create <span class="text-blue-600 dark:text-blue-500">Section</span>
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto text-start border p-4 rounded-xl"
      >
        <div className="mb-8 flex w-full gap-4">
          <label
            htmlFor="title"
            className="font-bold block mb-2 mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl dark:text-black w-[20%]"
          >
            Section Title:
          </label>
          <div className="w-full">
            <input
              type="text"
              id="title"
              name="title"
              value={sectionData.title}
              onChange={handleChange}
              className="border bg-gray-100 border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="my-8">
            <h2 className="font-bold mb-2">Upload Thumbnail</h2>
            <ImageUploading
              value={image}
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
                  {image.length === 0 ? (
                    <p
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                      className="  text-gray-400 font-bold py-2 px-4 rounded"
                    >
                      Click or Drop <span className="text-blue-500">here</span>
                    </p>
                  ) : (
                    <p
                      onClick={onImageRemoveAll}
                      className="text-gray-400   font-bold py-2 px-4 rounded"
                    >
                      Remove Image
                    </p>
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
        <div className="my-8">
          <label className="block mb-2">
            <h2 className="font-bold mb-2">Uploaded Audio Files</h2>
          </label>
          <div className="items-center gap-2">
            {audios.map((audio, index) => (
              <div key={index} className="flex items-center">
                <p>{index+1}.</p>
                <p className="mr-2 ml-2">{audio.name}</p>
                <button
                  type="button"
                  className=" text-white font-bold py-1 px-2 rounded"
                  onClick={() => removeAudio(index)}
                >
                  <img src="https://static.vecteezy.com/system/resources/previews/018/887/460/original/signs-close-icon-png.png" alt="remove" width={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleUploadFiles}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateSectionPage;
