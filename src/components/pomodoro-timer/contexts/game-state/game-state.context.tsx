import React, {createContext, FunctionComponent, useContext, useMemo, useState,} from 'react';

import {SetStateType} from '../../../../types/set-state/set-state.type';

type GameStateContextValues = {
  // utility
  durationInMs: (duration: number) => number,
  durationInMinutes: (duration: number) => number,

  // Focus
  focusDuration: number,
  setFocusDuration: SetStateType<number>,
  isUseTargetFocusIntervals: boolean,
  setIsUseTargetFocusIntervals: SetStateType<boolean>,
  setTargetFocusIntervals: SetStateType<number>,
  targetFocusIntervals: number,

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
}


const GameStateContext = createContext<GameStateContextValues | undefined>(undefined);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameStateContext must be inside a GameStateProvider');
  }

  return context;
};

export const GameStateProvider: FunctionComponent = ({children}) => {
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

  const durationInMs = (minutes: number) => minutes * 60 * 1000;
  const durationInMinutes = (ms: number) => ms / 60 / 1000;

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
