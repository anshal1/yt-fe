import React, { useEffect, useRef, useState } from "react";
import style from "../Styles/VideoCard.module.css";
import { FormatDate, FormatNumber } from "../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../utils/helperfunction";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [Duration, setDuration] = useState(0); // mins
  useEffect(() => {
    setDuration(Number(videoRef?.current?.duration / 60).toFixed(2));
  }, [videoRef]);
  return (
    <div
      className={style["vid-card"]}
      onClick={() => {
        navigate(`/video/${video?.slug}`);
      }}
    >
      <video
        src={video?.video?.["640x360"]}
        className={style["video-thumbnail"]}
        width={400}
        ref={videoRef}
      ></video>
      <span className={style["duration"]}>{Duration} min</span>
      <div className={style["details-container"]}>
        <div className={style["vid-details"]}>
          <p className={style["vid-title"]}>{truncateString(video?.title)}</p>
        </div>
        <div className={style["user-details"]}>
          <span className={style["uploaded-by"]}>{video?.user?.username}</span>
          <span className={style["views"]}>
            {FormatNumber(video?.views)} Views
          </span>
          <span className="uploaded-at">{FormatDate(video?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
