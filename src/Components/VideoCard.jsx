import React from "react";
import style from "../Styles/VideoCard.module.css";
import { FormatDate } from "../utils/FormatDate";

const VideoCard = ({ video }) => {
  return (
    <div className={style["vid-card"]}>
      <video
        src={video?.video?.["640x360"]}
        className="video-thumbnail"
        width={400}
      ></video>
      <div className={style["details-container"]}>
        <div className={style["vid-details"]}>
          <p className={style["vid-title"]}>{video?.title}</p>
        </div>
        <div className={style["user-details"]}>
          <span className={style["uploaded-by"]}>{video?.user?.username}</span>
          <span className={style["views"]}>{video?.views} Views</span>
          <span className="uploaded-at">{FormatDate(video?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
