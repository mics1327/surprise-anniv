import React, { useRef, useState } from "react";
import Timeline from "./Timeline";
import "./App.css";
import { FaPlay, FaPause } from "react-icons/fa"; // Import icons

function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Our Story</h1>
      <Timeline />
      <div className="music-controls">
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
      <audio ref={audioRef} src="music.mp3" loop />
    </div>
  );
}

export default App;