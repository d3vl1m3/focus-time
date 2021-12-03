const {
  useState,
  useEffect,
} = require('react');

export const Timer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) interval = setInterval(() => {
      setTime((t) => t + 1000);
    }, 1000);
    else clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const reset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTime(0);
  };

  const start = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  return {
    isActive,
    isPaused,
    reset,
    start,
    time,
    togglePlayPause,
  };
};
