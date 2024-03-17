import React, { useState, useEffect } from 'react';
import cover1 from "../../assets/images/22.svg";
import cover2 from "../../assets/images/23.svg";
import cover3 from "../../assets/images/24.svg";

const Carousel = () => {
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const covers = [cover1, cover2, cover3];

  const goToNextCover = () => {
    setCurrentCoverIndex((prevIndex) =>
      prevIndex === covers.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextCover, 2000);
    return () => clearInterval(intervalId);
  }, [currentCoverIndex]);

  return (
    <div className="overflow-hidden rounded-lg h-60">
      {covers.map((cover, index) => (
        <div key={index} className={`cover-slide ${index === currentCoverIndex ? 'block' : 'hidden'} `}>
          <div>
            <img src={cover} alt={`Cover ${index}`} className="rounded  sm:h-80 h-60" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
