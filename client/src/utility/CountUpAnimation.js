// Copied from https://jshakespeare.com/simple-count-up-number-animation-javascript-react/

import React, { useEffect, useState } from "react";

const easeOutQuad = (t) => t * (2 - t);
const frameDuration = 1000 / 60;

const CountUpAnimation = ({ children, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const countTo = parseInt(children, 10);
    if (!isNaN(countTo)) {
      let frame = 0;
      const totalFrames = Math.round(duration / frameDuration);
      const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        setCount(countTo * progress);

        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);

      return () => clearInterval(counter);
    }
  }, []);

  return Math.floor(count);
};

export default CountUpAnimation;
