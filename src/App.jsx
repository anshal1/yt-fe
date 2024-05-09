import React from "react";
import Home from "./Pages/Home";
import VideoPlayer from "./Pages/VideoPlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:slug" element={<VideoPlayer />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
