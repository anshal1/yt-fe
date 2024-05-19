import React, { useEffect, useRef, useState } from "react";
import style from "../Styles/VideoCard.module.css";
import { FormatDate, FormatNumber } from "../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import { truncateString } from "../utils/helperfunction";
import { FaTrash } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../Context";

const VideoCard = ({ video }) => {
  const { User } = useContext(UserContext);
  const navigate = useNavigate();
  const videoRef = useRef();
  const [Duration, setDuration] = useState(0); // mins
  const [isProcessing, setisProcessing] = useState(false);
  useEffect(() => {
    if (!video?.video?.["640x360"]) return;
    const handleSetDuration = (e) => {
      setDuration(Number(e.target.duration / 60).toFixed(2));
    };
    const handleProcessing = () => {
      setisProcessing(true);
    };
    videoRef?.current?.addEventListener("loadedmetadata", handleSetDuration);
    videoRef?.current?.addEventListener("error", handleProcessing);

    return () => {
      videoRef?.current?.removeEventListener(
        "loadedmetadata",
        handleSetDuration
      );
      videoRef?.current?.removeEventListener("error", handleProcessing);
    };
  }, [videoRef, video]);
  return (
    <div
      className={style["vid-card"]}
      onClick={() => {
        if (isProcessing) {
          alert("Video Is Under Processing");
          return;
        }
        navigate(`/video/${video?.slug}`);
      }}
    >
      {User?._id === video?.user?._id && (
        <div className={style["delete-button"]}>
          <FaTrash
            color="red"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Delete");
            }}
          />
        </div>
      )}

      {isProcessing ? (
        <div className={style["processing"]}>
          <p>Video is under processing, Please check again in few minutes</p>
        </div>
      ) : (
        <video
          src={video?.video?.["640x360"]}
          className={style["video-thumbnail"]}
          width={400}
          ref={videoRef}
        ></video>
      )}

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
