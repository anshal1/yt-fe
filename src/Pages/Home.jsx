import React, { useEffect, useState } from "react";
import { DeleteVideo, getAllVideo } from "../Services/video.service";
import VideoCard from "../Components/VideoCard";
import style from "../Styles/Home.module.css";

const Home = () => {
  const [Video, setVideo] = useState([]);

  const handleDelete = async (id) => {
    const confirm_popup = confirm("Are You Sure You Want To Delete The Video");
    if (!confirm_popup) return;
    const deletedVid = await DeleteVideo(id);
    const updatedVid = Video.filter((vid) => {
      return vid?._id !== deletedVid?._id;
    });
    setVideo(updatedVid);
  };

  useEffect(() => {
    localStorage.removeItem("watched");
    (async () => {
      const data = await getAllVideo({ page: 1, limit: 10 });
      setVideo(data?.videos);
    })();
  }, []);

  return (
    <section>
      <main className={style["main"]}>
        {Video?.map((video) => {
          return (
            <VideoCard
              video={video}
              key={video?._id}
              handleDelete={handleDelete}
            />
          );
        })}
      </main>
    </section>
  );
};

export default Home;
