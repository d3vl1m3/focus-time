import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const GameStateContext = createContext(undefined);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameStateContext must be inside a GameStateProvider');
  }

  return context;
};

export const GameStateProvider = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(25 * 1000 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 1000 * 60);

  const [isUseLongBreaks, setIsUseLongBreaks] = useState(false);
  const [longBreakDuration, setLongBreakDuration] = useState(10 * 1000 * 60);
  const [longBreakGap, setLongBreakGap] = useState(4);

  const [isUseTargetFocusIntervals, setIsUseTargetFocusIntervals] = useState(false);
  const [targetFocusIntervals, setTargetFocusIntervals] = useState(8);

  const [focusIntervalsCompleted, setFocusIntervalsCompleted] = useState(0);

  const [isFirstInterval, setIsFirstInterval] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const durationInMs = (minutes) => minutes * 60 * 1000;
  const durationInMinutes = (ms) => ms / 60 / 1000;

  const values = useMemo(() => ({
    // utility
    durationInMs,
    durationInMinutes,

    // Focus
    focusDuration,
    setFocusDuration,
    isUseTargetFocusIntervals,
    setIsUseTargetFocusIntervals,
    setTargetFocusIntervals,
    targetFocusIntervals,

    // Game logic
    isCompleted,
    setIsCompleted,
    isFirstInterval,
    setIsFirstInterval,
    focusIntervalsCompleted,
    setFocusIntervalsCompleted,

    // Long breaks
    isUseLongBreaks,
    setIsUseLongBreaks,
    longBreakDuration,
    setLongBreakGap,
    longBreakGap,
    setLongBreakDuration,

    // Short breaks
    setShortBreakDuration,
    shortBreakDuration,
  }), [
    // Focus
    focusDuration,
    isUseTargetFocusIntervals,
    targetFocusIntervals,

    // Game logic
    isCompleted,
    isFirstInterval,
    focusIntervalsCompleted,

    // Long breaks
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,

    // Short breaks
    setShortBreakDuration,
    shortBreakDuration,
  ]);

  return (
    <GameStateContext.Provider value={values}>
      {children}
    </GameStateContext.Provider>
  );
};
