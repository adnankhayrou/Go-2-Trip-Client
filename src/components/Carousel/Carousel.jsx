import React, { useState, useEffect } from 'react';
import cover1 from "../../assets/images/22.svg";
import cover2 from "../../assets/images/23.svg";
import cover3 from "../../assets/images/24.svg";
import cover4 from "../../assets/images/cover2.jpg";
import cover5 from "../../assets/images/cover3.jpg";
import cover6 from "../../assets/images/cover4.jpg";

const Carousel = () => {
  const [currentCoverIndex, setCurrentCoverIndex] = useState(0);
  const covers = [cover1, cover4, cover2, cover5, cover3, cover6,];

  const goToNextCover = () => {
    setCurrentCoverIndex((prevIndex) =>
      prevIndex === covers.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(goToNextCover, 3000);
    return () => clearInterval(intervalId);
  }, [currentCoverIndex]);

  return (
    <div className="overflow-hidden rounded-lg sm:h-60 shadow-lg">
      {covers.map((cover, index) => (
        <div key={index} className={`cover-slide ${index === currentCoverIndex ? 'block' : 'hidden'}`}>
          <div>
            <img src={cover} alt={`Cover ${index}`} className="rounded  sm:h-80 " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
