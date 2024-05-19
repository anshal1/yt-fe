import React, { useRef, useState } from "react";
import Button from "../Components/Button";
import { CatchErr } from "../utils/CatchErr";
import { BASEURL } from "../utils/Constant";
import style from "../Styles/Upload.module.css";
import Input from "../Components/Input";
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Upload = () => {
  const mediaRef = useRef();
  const navigate = useNavigate();
  const [VideoData, setVideoData] = useState({
    video: null,
    title: "",
  });
  const [Progress, setProgress] = useState({
    uploaded: 0,
    finished: false,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [Preview, setPreview] = useState("");
  const showProgress = (e) => {
    setProgress(() => {
      return {
        finished: false,
        uploaded: Math.round((e.loaded / e.total) * 100),
      };
    });
  };
  const handleFinish = () => {
    setProgress(() => {
      return {
        uploaded: 0,
        finished: true,
      };
    });
    setIsUploading(false);
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
      setIsUploading(true);
    });
  });
  const handleUpload = async () => {
    const data = await UploadVideo(VideoData);
    if (data?.message) {
      toast.success(data?.message);
      navigate("/");
    }
  };

  const handlePreview = CatchErr((file) => {
    setVideoData((prev) => {
      return {
        ...prev,
        title: file?.name,
      };
    });
    const blob = URL.createObjectURL(file);
    setPreview(blob);
  });

  return (
    <div className={style["main"]}>
      <div className={style["upload-section"]}>
        {Preview && (
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
        )}
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
      {isUploading && (
        <div className={style["progress"]}>
          {Progress.uploaded === 100 ? (
            <div className={style["message"]}>
              <p>Video is now under processing</p>
            </div>
          ) : (
            <div
              className={style["bar"]}
              style={{ "--width": `${Progress.uploaded}%` }}
            ></div>
          )}
        </div>
      )}

      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default Upload;
