import { defaultSettingValues } from '@data';
import { SetStateType } from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SettingsStateContextValues = {
  // Focus
  focusDuration: number,
  setFocusDuration: SetStateType<number>,
  isUseFocusIntervalsTarget: boolean,
  setIsUseFocusIntervalsTarget: SetStateType<boolean>,
  focusIntervalsTarget: number,
  setFocusIntervalsTarget: SetStateType<number>,
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

const SettingsStateContext = createContext<SettingsStateContextValues | undefined>(undefined);

export const useSettingsStateContext = () => {
  const context = useContext(SettingsStateContext);
  if (context === undefined) {
    throw new Error('useSettingsStateContext must be inside a SettingsStateProvider');
  }

  return context;
};

export const SettingsStateProvider: FunctionComponent = ({ children }) => {
  const [focusDuration, setFocusDuration] = useState(defaultSettingValues.focusDuration);
  const [shortBreakDuration, setShortBreakDuration] = useState(defaultSettingValues.shortBreakDuration);

  const [isUseLongBreaks, setIsUseLongBreaks] = useState(defaultSettingValues.isUseLongBreaks);
  const [longBreakDuration, setLongBreakDuration] = useState(defaultSettingValues.longBreakDuration);
  const [longBreakGap, setLongBreakGap] = useState(defaultSettingValues.longBreakGap);

  const [
    isUseFocusIntervalsTarget,
    setIsUseFocusIntervalsTarget,
  ] = useState(defaultSettingValues.isUseFocusIntervalsTarget);
  const [focusIntervalsTarget, setFocusIntervalsTarget] = useState(defaultSettingValues.focusIntervalsTarget);

  const [focusIntervalsCompleted, setFocusIntervalsCompleted] = useState(0);

  const values = useMemo(() => ({
    focusDuration,
    focusIntervalsCompleted,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,
    setFocusDuration,
    setFocusIntervalsCompleted,
    setFocusIntervalsTarget,
    setIsUseFocusIntervalsTarget,
    setIsUseLongBreaks,
    setLongBreakDuration,
    setLongBreakGap,
    setShortBreakDuration,
    shortBreakDuration,
  }), [
    focusDuration,
    focusIntervalsCompleted,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,
    shortBreakDuration,
  ]);

  return (
    <SettingsStateContext.Provider value={values}>
      {children}
    </SettingsStateContext.Provider>
  );
};
