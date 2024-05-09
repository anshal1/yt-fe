import React, { useEffect, useState } from "react";
import { getAllVideo } from "../Services/video.service";
import VideoCard from "../Components/VideoCard";
import Select from "../Components/Select";

const Home = () => {
  const [Video, setVideo] = useState([]);
  useEffect(() => {
    localStorage.removeItem("watched");
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
      <Select options={[{ label: "Option1", value: "option 1" }]} />
    </section>
  );
};

export default Home;
