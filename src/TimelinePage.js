import React, { useState, useEffect } from "react";
import Timeline from "./Timeline";
import "./TimelinePage.css";
import { FaPlay, FaPause, FaArrowLeft, FaArrowDown, FaStop } from "react-icons/fa";

function TimelinePage({ goBack, audioRef, isPlaying, togglePlay }) {
  const [autoScroll, setAutoScroll] = useState(true);

  const toggleAutoScroll = () => setAutoScroll(!autoScroll);

  useEffect(() => {
    let interval;
    if (autoScroll) {
      interval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: "smooth" });
      }, 20);
    }
    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <div className="app-container">
      <h1 className="app-title">Our Story</h1>
      <Timeline />

      {/* Music controls */}
      <div className="music-controls">
        <button onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>

      {/* Auto-scroll toggle */}
      <div className="scroll-toggle">
        <button onClick={toggleAutoScroll}>
          {autoScroll ? <FaStop /> : <FaArrowDown />}
        </button>
      </div>

      {/* Back to letter button */}
      <div className="back-button">
        <button onClick={goBack}>
          <FaArrowLeft />
        </button>
      </div>
    </div>
  );
}

export default TimelinePage;