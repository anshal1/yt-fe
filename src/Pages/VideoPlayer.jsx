import React, { useEffect, useRef, useState } from "react";
import { getSingleVideo } from "../Services/video.service";
import { useParams } from "react-router-dom";
import Select from "../Components/Select";
import { options } from "../utils/Constant";
import style from "../Styles/VideoPlayer.module.css";

const VideoPlayer = () => {
  const { slug } = useParams();
  const [Video, setVideo] = useState({});
  const [Quality, setQuality] = useState("640x360");
  const [isPlaying, setisPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [vidDuration, setvidDuration] = useState(0);
  const [vidCurrentTIme, setvidCurrentTime] = useState(0);

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (vidRef.current.requestFullscreen) {
        vidRef.current.requestFullscreen();
      } else if (vidRef.current.mozRequestFullScreen) {
        // Firefox
        vidRef.current.mozRequestFullScreen();
      } else if (vidRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        vidRef.current.webkitRequestFullscreen();
      } else if (vidRef.current.msRequestFullscreen) {
        // IE/Edge
        vidRef.current.msRequestFullscreen();
      }
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const updateProgress = () => {
      setvidCurrentTime(vidRef?.current?.currentTime);
      setvidDuration(vidRef?.current?.duration);
    };
    const interval = setInterval(updateProgress, 500);

    vidRef?.current?.addEventListener("timeupdate", updateProgress);

    return () => {
      clearInterval(interval);
      vidRef?.current?.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

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

  return (
    <div className={style["vid-player-container"]}>
      <video src={Video?.video?.[Quality]} width={800} ref={vidRef}></video>
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
            {!isPlaying ? "Play" : "Pause"}
          </button>
          <button onClick={toggleFullScreen}>
            {isFullScreen ? "Exit Full Screen" : "Full Screen"}
          </button>
          <button
            onClick={() => {
              vidRef.current.muted = !vidRef?.current?.muted;
            }}
          >
            {vidRef?.current?.muted ? "Unmute" : "Mute"}
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
  );
};

export default VideoPlayer;
