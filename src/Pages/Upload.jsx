import React, { useState } from "react";
import Button from "../Components/Button";
import { CatchErr } from "../utils/CatchErr";
import { BASEURL } from "../utils/Constant";

const Upload = () => {
  const [Video, setVideo] = useState(null);
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
    const data = await UploadVideo({ title: "New Title", video: Video });
    console.log(data);
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
      />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
};

export default Upload;
