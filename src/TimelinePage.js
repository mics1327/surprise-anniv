import React, { useState, useEffect } from "react";
import Timeline from "./Timeline";
import "./TimelinePage.css";
import { FaPlay, FaPause, FaArrowLeft, FaArrowDown, FaStop } from "react-icons/fa";

function TimelinePage({ goBack, audioRef, isPlaying, togglePlay }) {
  const [autoScroll, setAutoScroll] = useState(true);

  const toggleAutoScroll = () => setAutoScroll(!autoScroll);

  useEffect(() => {
    let animationFrameId;
    let frameCount = 0;

    const step = () => {
      frameCount++;
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;

      // Slow scroll: scroll 1px every 3 frames (~20px/sec)
      if (autoScroll && !scrolledToBottom && frameCount % 3 === 0) {
        window.scrollBy(0, 1);
      }

      if (!scrolledToBottom) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    if (autoScroll) {
      animationFrameId = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [autoScroll]);

  return (
    <div className="app-container">
      <h1 className="app-title">Our Story</h1>
      <Timeline />

       {/* Closing message */}
      <div className="timeline-end-message">
        And here's to a lifetime of us together ❤️ Happy Anniversary!
      </div>

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