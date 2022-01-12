import { defaultSettingValues } from '@data';
import {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';

import { SettingsStateContext } from './settings-state.context';

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

  const [isUseSound, setIsUseSound] = useState(defaultSettingValues.isUseSound);

  const [isUseDarkMode, setIsUseDarkMode] = useState<boolean|null>(null);

  // Runs once on mounted
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsUseDarkMode(true);
    } else {
      setIsUseDarkMode(false);
    }
  }, []);

  useEffect(() => {
    if (isUseDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isUseDarkMode]);

  const values = useMemo(() => ({
    focusDuration,
    focusIntervalsTarget,
    isUseDarkMode,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    isUseSound,
    longBreakDuration,
    longBreakGap,
    setFocusDuration,
    setFocusIntervalsTarget,
    setIsUseDarkMode,
    setIsUseFocusIntervalsTarget,
    setIsUseLongBreaks,
    setIsUseSound,
    setLongBreakDuration,
    setLongBreakGap,
    setShortBreakDuration,
    shortBreakDuration,
  }), [
    focusDuration,
    focusIntervalsTarget,
    isUseDarkMode,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    isUseSound,
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
