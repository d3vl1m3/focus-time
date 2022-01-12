import { SetStateType } from '@types';
import { createContext, useContext } from 'react';

export type SettingsStateContextValues = {
  // Focus
  focusDuration: number,
  setFocusDuration: SetStateType<number>,
  isUseFocusIntervalsTarget: boolean,
  setIsUseFocusIntervalsTarget: SetStateType<boolean>,
  focusIntervalsTarget: number,
  setFocusIntervalsTarget: SetStateType<number>,

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

  // Sound
  isUseSound: boolean
  setIsUseSound: SetStateType<boolean>

  // DarkMode
  isUseDarkMode: boolean|null
  setIsUseDarkMode: SetStateType<boolean|null>
};

export const SettingsStateContext = createContext<SettingsStateContextValues | undefined>(undefined);

export const useSettingsStateContext = () => {
  const context = useContext(SettingsStateContext);
  if (context === undefined) {
    throw new Error('useSettingsStateContext must be inside a SettingsStateProvider');
  }

  return context;
};
