import React, { useState, useRef } from "react";
import LandingLetter from "./LandingLetter";
import TimelinePage from "./TimelinePage";

function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleEnterTimeline = () => setShowTimeline(true);
  const handleBackToLetter = () => setShowTimeline(false);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Always render audio so it exists in the DOM */}
      <audio ref={audioRef} src="music.mp3" loop />

      {!showTimeline ? (
        <LandingLetter
          onEnter={handleEnterTimeline}
          audioRef={audioRef}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
        />
      ) : (
        <TimelinePage
          goBack={handleBackToLetter}
          audioRef={audioRef}
          isPlaying={isPlaying}
          togglePlay={togglePlay}
        />
      )}
    </>
  );
}

export default App;
