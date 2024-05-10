import React from "react";
import style from "../Styles/VideoCard.module.css";
import { FormatDate, FormatNumber } from "../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../utils/helperfunction";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();
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
      ></video>
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
