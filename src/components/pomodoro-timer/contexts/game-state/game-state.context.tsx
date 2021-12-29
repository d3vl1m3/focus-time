import { createContext, FunctionComponent, useContext, useMemo, useState } from 'react';

import { SetStateType } from '../../../../types/set-state/set-state.type';

type GameStateContextValues = {
  // Focus
  focusDuration: number,
  setFocusDuration: SetStateType<number>,
  isUseFocusIntervalsTarget: boolean,
  setIsUseFocusIntervalsTarget: SetStateType<boolean>,
  setFocusIntervalsTarget: SetStateType<number>,
  focusIntervalsTarget: number,

  // Game logic
  isCompleted: boolean,
  setIsCompleted: SetStateType<boolean>,
  isFirstInterval: boolean,
  setIsFirstInterval: SetStateType<boolean>,
  focusIntervalsCompleted: number,
  setFocusIntervalsCompleted: SetStateType<number>,

  // Long breaks
  isUseLongBreaks: boolean,
  setIsUseLongBreaks: SetStateType<boolean>,
  longBreakDuration: number,
  setLongBreakGap: SetStateType<number>,
  longBreakGap: number,
  setLongBreakDuration: SetStateType<number>,

  // Short breaks
  setShortBreakDuration: SetStateType<number>,
  shortBreakDuration: number,
};

const GameStateContext = createContext<GameStateContextValues | undefined>(undefined);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameStateContext must be inside a GameStateProvider');
  }

  return context;
};

export const GameStateProvider: FunctionComponent = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(25 * 1000 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 1000 * 60);

  const [isUseLongBreaks, setIsUseLongBreaks] = useState(false);
  const [longBreakDuration, setLongBreakDuration] = useState(10 * 1000 * 60);
  const [longBreakGap, setLongBreakGap] = useState(4);

  const [isUseFocusIntervalsTarget, setIsUseFocusIntervalsTarget] = useState(false);
  const [focusIntervalsTarget, setFocusIntervalsTarget] = useState(8);

  const [focusIntervalsCompleted, setFocusIntervalsCompleted] = useState(0);

  const [isFirstInterval, setIsFirstInterval] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const values = useMemo(() => ({
    focusDuration,
    setFocusDuration,
    shortBreakDuration,
    setShortBreakDuration,
    longBreakDuration,
    setLongBreakDuration,

    isUseLongBreaks,
    setIsUseLongBreaks,
    longBreakGap,
    setLongBreakGap,

    isUseFocusIntervalsTarget,
    setIsUseFocusIntervalsTarget,

    focusIntervalsTarget,
    setFocusIntervalsTarget,
    focusIntervalsCompleted,
    setFocusIntervalsCompleted,
    isCompleted,
    setIsCompleted,
    isFirstInterval,
    setIsFirstInterval,

    // Long breaks
  }), [
    focusDuration,
    shortBreakDuration,
    longBreakDuration,

    isUseLongBreaks,
    longBreakGap,

    isUseFocusIntervalsTarget,

    focusIntervalsTarget,
    focusIntervalsCompleted,
    isCompleted,
    isFirstInterval,
  ]);

  return (
    <GameStateContext.Provider value={values}>
      {children}
    </GameStateContext.Provider>
  );
};
