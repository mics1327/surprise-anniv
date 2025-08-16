import React, { useEffect, useRef, useState } from "react";
import timelineData from "./timelineData"; // import your separate data file

function Timeline() {
  const itemRefs = useRef([]);
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleIndexes((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          }
        });
      },
      { threshold: 0.4 } // 40% visible triggers pop
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline">
      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item ${item.side} ${
            visibleIndexes.includes(index) ? "active" : "hidden"
          }`}
          ref={(el) => (itemRefs.current[index] = el)}
          data-index={index}
        >
          <div className="timeline-item-content">
            <img src={item.img} alt={item.text} />
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
