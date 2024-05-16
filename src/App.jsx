import React from "react";
import Home from "./Pages/Home";
import VideoPlayer from "./Pages/VideoPlayer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Upload from "./Pages/Upload";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:slug" element={<VideoPlayer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
