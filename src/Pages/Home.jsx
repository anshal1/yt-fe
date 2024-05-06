import React, { useEffect, useState } from "react";
import { getAllVideo } from "../Services/video.service";
import VideoCard from "../Components/VideoCard";

const Home = () => {
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await getAllVideo({ page: 1, limit: 10 });
      setVideo(data?.videos);
    })();
  }, []);

  return (
    <section>
      <main>
        {Video?.map((video) => {
          return <VideoCard video={video} key={video?._id} />;
        })}
      </main>
    </section>
  );
};

export default Home;
