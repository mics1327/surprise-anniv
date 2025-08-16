import React, { useEffect } from "react";
import "./LandingLetter.css";
import { FaPlay, FaPause } from "react-icons/fa";

function LandingLetter({ onEnter, audioRef, isPlaying, togglePlay }) {
  // Fade-in paragraphs
  useEffect(() => {
    const paragraphs = document.querySelectorAll(".fade-paragraph");
    paragraphs.forEach((p, i) => {
      setTimeout(() => p.classList.add("visible"), i * 1000);
    });
  }, []);

  const handlePlayClick = () => {
  if (!audioRef.current) return;

  // Start audio at volume 0
  audioRef.current.volume = 0;
  audioRef.current.play().catch((err) => console.log("Audio play blocked:", err));
  togglePlay();

  // Gradually increase volume to 1 over 3 seconds
  let volume = 0;
  const fadeInterval = setInterval(() => {
    if (volume < 1) {
      volume += 0.02; // increase by 0.02
      audioRef.current.volume = Math.min(volume, 1);
    } else {
      clearInterval(fadeInterval);
    }
  }, 60); // every 60ms
};


  return (
    <div className="landing-container">
      <div className="letter">
        <p className="fade-paragraph">Hi there,</p>
        <p className="fade-paragraph">I know you told me that it's okay not to have a surprise</p>
        <p className="fade-paragraph">But how could I? Even when I don't have anything...</p>
        <p className="fade-paragraph">...you're my everything.</p>
        <p className="fade-paragraph">And so, this is trip down memory lane</p>
        <p className="fade-paragraph">I hope you like it.</p>
        <p className="fade-paragraph">Happy Anniversary, my love.</p>
        <p className="fade-paragraph">
          <button onClick={onEnter} className="enter-button">Enter Timeline</button>
        </p>
      </div>

      {/* Floating music control */}
      <div className="music-controls">
        <button onClick={handlePlayClick}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
}

export default LandingLetter;