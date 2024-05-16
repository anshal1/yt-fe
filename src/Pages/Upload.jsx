import React, { useRef, useState } from "react";
import Button from "../Components/Button";
import { CatchErr } from "../utils/CatchErr";
import { BASEURL } from "../utils/Constant";
import style from "../Styles/Upload.module.css";
import Input from "../Components/Input";
import { FaUpload } from "react-icons/fa";

const Upload = () => {
  const mediaRef = useRef();
  const [VideoData, setVideoData] = useState({
    video: null,
    title: "",
  });
  const [Preview, setPreview] = useState("");
  const showProgress = (e) => {
    console.log(e.total);
    console.log(e.loaded);
  };
  const handleFinish = () => {
    console.log("Upload Finish");
  };
  const UploadVideo = CatchErr(async (body) => {
    return new Promise((resolve, reject) => {
      const url = `${BASEURL}/video`;
      const fd = new FormData();
      fd.append("title", body?.title);
      fd.append("video", body?.video);
      const ajax = new XMLHttpRequest();
      ajax.upload.addEventListener("progress", showProgress, false);
      ajax.addEventListener("load", () => {
        const response = JSON.parse(ajax.responseText);
        if (response?.error) {
          reject(response);
        }
        handleFinish();
        resolve(response);
      });
      ajax.open("POST", url);
      ajax.setRequestHeader("token", `${localStorage.getItem("token")}`);
      ajax.send(fd);
    });
  });
  const handleUpload = async () => {
    const data = await UploadVideo(VideoData);
    console.log(data);
  };

  const handlePreview = CatchErr((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      setPreview(e.target.result);
    });
    reader.addEventListener("error", () => {
      throw new Error("Error In Loading Video");
    });
    reader.readAsDataURL(file);
  });

  return (
    <div className={style["main"]}>
      <div className={style["upload-section"]}>
        <input
          type="file"
          style={{ display: "none" }}
          ref={mediaRef}
          onChange={(e) => {
            handlePreview(e.target.files[0]);
            setVideoData((prev) => {
              return {
                ...prev,
                video: e.target.files[0],
              };
            });
          }}
        />
      </div>
      <div className={style["preview"]}>
        {Preview ? (
          <video src={Preview} controls width={"100%"} height={"100%"}></video>
        ) : (
          <div>
            <FaUpload
              style={{
                cursor: "pointer",
                display: "block",
                width: "44px",
                height: "44px",
              }}
              onClick={() => {
                mediaRef?.current?.click();
              }}
            />
          </div>
        )}
      </div>
      <div className={style["title"]}>
        <Input
          placeholder={"Video Title"}
          value={VideoData?.title}
          onChange={(e) => {
            setVideoData((prev) => {
              return {
                ...prev,
                title: e.target.value,
              };
            });
          }}
        />
      </div>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default Upload;
