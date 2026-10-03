import React, { useEffect, useState } from 'react';

const TopProgressBar = ({ duration = 5000, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const interval = setInterval(() => {
      const now = Date.now();
      const percentage = Math.min(100, ((now - startTime) / duration) * 100);

      setProgress(percentage);

      if (now >= endTime) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 50); // Update every 50ms for smoothness

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] pointer-events-none" dir="ltr">
      {/* Background Track */}
      <div className="absolute inset-0 bg-gray-200/20"></div>
      
      {/* Progress Line (Red like YouTube or Blue for your Brand) */}
      <div 
        className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.7)] transition-all ease-linear duration-75"
        style={{ width: `${progress}%` }}
      >
        {/* Glow Effect at the tip */}
        <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-l from-white/50 to-transparent transform translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default TopProgressBar;
