import React, { useEffect, useRef, useState } from "react";
import { UpdateViews, getSingleVideo } from "../Services/video.service";
import { useParams } from "react-router-dom";
import Select from "../Components/Select";
import { options } from "../utils/Constant";
import style from "../Styles/VideoPlayer.module.css";

import {
  FaCompress,
  FaExpand,
  FaEye,
  FaPause,
  FaPlay,
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";
import { FormatNumber } from "../utils/FormatDate";

const VideoPlayer = () => {
  const { slug } = useParams();
  const [Video, setVideo] = useState({});
  const [Quality, setQuality] = useState("640x360");
  const [isPlaying, setisPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [vidDuration, setvidDuration] = useState(0);
  const [vidCurrentTIme, setvidCurrentTime] = useState(0);
  const [Width, setWidth] = useState(800);
  const [Height, setHeight] = useState(450);
  const [isProcessing, setisProcessing] = useState(false);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      setIsFullScreen(true);
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    } else {
      setIsFullScreen(false);
      setWidth(800);
      setHeight(450);
    }
  };

  useEffect(() => {
    const recentlyWatched = () => {
      return new Promise((resolve) => {
        const storageData = localStorage.getItem("watched");
        if (!storageData) resolve(true);
        const parsed = JSON.parse(storageData);
        if (parsed?.video === Video?._id) resolve(false);
      });
    };
    const updateViews = async () => {
      if (!Video?._id) return;
      const hasWatched = await recentlyWatched();
      if (!hasWatched) {
        return;
      }
      const newUpdatedVid = await UpdateViews(Video?._id);
      localStorage.setItem(
        "watched",
        JSON.stringify({ timestamp: new Date(), video: Video?._id })
      );
      setVideo(newUpdatedVid);
    };
    const updateProgress = async () => {
      setvidCurrentTime(vidRef?.current?.currentTime);
      setvidDuration(vidRef?.current?.duration);
      const passedTimeInPercent =
        (vidRef?.current?.currentTime / vidRef?.current?.duration) * 100;
      if (passedTimeInPercent >= 25) {
        updateViews();
      }
    };
    const interval = setInterval(updateProgress, 500);

    vidRef?.current?.addEventListener("timeupdate", updateProgress);

    return () => {
      clearInterval(interval);
      vidRef?.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, [Video]);

  useEffect(() => {
    const handleProcessing = () => {
      setisProcessing(true);
    };
    vidRef?.current?.addEventListener("error", handleProcessing);
    return () => {
      setisProcessing(false);
      vidRef?.current?.removeEventListener("error", handleProcessing);
    };
  }, [Video, Quality]);

  const handleSeek = (e) => {
    vidRef.current.currentTime = e.target.value;
    setvidCurrentTime(e.target.value);
  };

  const vidRef = useRef();
  useEffect(() => {
    (async () => {
      const video = await getSingleVideo(slug);
      setVideo(video?.video);
    })();
  }, []);

  window.onload = () => {
    localStorage.removeItem("watched");
  };

  return (
    <>
      <div className={style["vid-player-container"]}>
        {!isFullScreen && (
          <div className={style["details"]}>
            <div className={style["title"]}>
              <p>{Video?.title}</p>
            </div>
          </div>
        )}
        {isProcessing ? (
          <div className={style["processing"]}>
            <p>Video is under processing, Please check again in few minutes</p>
          </div>
        ) : (
          <video
            src={Video?.video?.[Quality]}
            width={Width}
            height={Height}
            ref={vidRef}
            className={style["video"]}
          ></video>
        )}

        {!isFullScreen && (
          <div className={style["details"]}>
            <div className={style["views"]}>
              <p>
                {FormatNumber(Video?.views)}{" "}
                <FaEye style={{ width: "24px", height: "24px" }} />{" "}
              </p>
            </div>
          </div>
        )}
        <div className={style["buttons"]}>
          <div className={style["action-btn"]}>
            <button
              onClick={() => {
                if (vidRef?.current?.paused) {
                  vidRef?.current?.play();
                  setisPlaying(true);
                } else {
                  vidRef?.current?.pause();
                  setisPlaying(false);
                }
              }}
            >
              {!isPlaying ? (
                <FaPlay style={{ width: "24px", height: "24px" }} />
              ) : (
                <FaPause style={{ width: "24px", height: "24px" }} />
              )}
            </button>
            <button onClick={toggleFullScreen}>
              {isFullScreen ? (
                <FaCompress style={{ width: "24px", height: "24px" }} />
              ) : (
                <FaExpand style={{ width: "24px", height: "24px" }} />
              )}
            </button>
            <button
              onClick={() => {
                vidRef.current.muted = !vidRef?.current?.muted;
              }}
            >
              {vidRef?.current?.muted ? (
                <FaVolumeXmark style={{ width: "24px", height: "24px" }} />
              ) : (
                <FaVolumeHigh style={{ width: "24px", height: "24px" }} />
              )}
              {/* Mute */}
            </button>
          </div>
          <input
            type="range"
            min={0}
            max={vidDuration}
            value={vidCurrentTIme}
            onChange={handleSeek}
            className={style["vid-progress"]}
          />
          <div style={{ width: "5rem" }}>
            <Select
              value={Quality}
              options={options}
              onChange={(val) => {
                setQuality(val);
              }}
              placeholder={"Quality"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoPlayer;
