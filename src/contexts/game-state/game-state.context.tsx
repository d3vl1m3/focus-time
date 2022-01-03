import { defaultSettingValues } from '@data';
import { SetStateType } from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

export type GameStateContextValues = {
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
  const [focusDuration, setFocusDuration] = useState(defaultSettingValues.focusDuration * 1000 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(defaultSettingValues.shortBreakDuration * 1000 * 60);

  const [isUseLongBreaks, setIsUseLongBreaks] = useState(defaultSettingValues.isUseLongBreaks);
  const [longBreakDuration, setLongBreakDuration] = useState(defaultSettingValues.longBreakDuration * 1000 * 60);
  const [longBreakGap, setLongBreakGap] = useState(defaultSettingValues.longBreakGap);

  const [
    isUseFocusIntervalsTarget,
    setIsUseFocusIntervalsTarget,
  ] = useState(defaultSettingValues.isUseFocusIntervalsTarget);
  const [focusIntervalsTarget, setFocusIntervalsTarget] = useState(defaultSettingValues.focusIntervalsTarget);

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
