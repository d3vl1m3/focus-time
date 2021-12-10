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

const intervalLength = 500;

export const TimerStateProvider = ({ children }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused && !isSkipping) {
      interval = setInterval(() => {
        setTime((t) => t - intervalLength);
      }, intervalLength);
    } else {
      // set a new pause period and minus this from the interval time.
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, isSkipping]);

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
    time,
  ]);

  return (
    <TimerStateContext.Provider value={values}>
      {children}
    </TimerStateContext.Provider>
  );
};
