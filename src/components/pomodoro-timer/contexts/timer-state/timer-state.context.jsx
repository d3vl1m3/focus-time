import React, {
  createContext,
  useContext, useEffect,
  useMemo,
  useState,
} from 'react';

const TimerStateContext = createContext(undefined);

export const useTimerStateContext = () => {
  const context = useContext(TimerStateContext);
  if (context === undefined) {
    throw new Error('useTimerStateContext must be inside a TimerStateProvider');
  }

  return context;
};

export const TimerStateProvider = ({ children }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        // todo: set this up to use time stamps and pause/resume interval stamps
        setTime((t) => t + 500);
      }, 500);
    } else {
      // set a new pause period and minus this from the interval time.
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const values = useMemo(() => ({
    isActive,
    isPaused,
    isSkipping,
    setIsActive,
    setIsPaused,
    setIsSkipping,
    setTime,
    time,
  }), [
    isActive,
    isPaused,
    isSkipping,
    setIsActive,
    setIsPaused,
    setIsSkipping,
    setTime,
    time,
  ]);

  return (
    <TimerStateContext.Provider value={values}>
      {children}
    </TimerStateContext.Provider>
  );
};
