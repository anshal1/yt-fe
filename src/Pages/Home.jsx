import React, { useEffect } from "react";
import { getAllVideo } from "../Services/video.service";

const Home = () => {
  useEffect(() => {
    (async () => {
      const data = await getAllVideo({ page: 1, limit: 10 });
      console.log(data);
    })();
  }, []);

  return <div>Home</div>;
};

export default Home;
