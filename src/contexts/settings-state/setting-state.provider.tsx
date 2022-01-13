import { useDefaultSettingsValues } from '@data';
import {
  FunctionComponent, useEffect, useMemo, useState,
} from 'react';

import { SettingsStateContext } from './settings-state.context';

export const SettingsStateProvider: FunctionComponent = ({ children }) => {

  const {
    focusDuration: focusDurationDefault,
    shortBreakDuration: shortBreakDurationDefault,
    isUseLongBreaks: isUseLongBreaksDefault,
    longBreakDuration: longBreakDurationDefault,
    longBreakGap: longBreakGapDefault,
    isUseFocusIntervalsTarget: isUseFocusIntervalsTargetDefault,
    focusIntervalsTarget: focusIntervalsTargetDefault,
    isUseSound: isUseSoundDefault,
  } = useDefaultSettingsValues();

  const [focusDuration, setFocusDuration] = useState(focusDurationDefault);
  const [shortBreakDuration, setShortBreakDuration] = useState(shortBreakDurationDefault);

  const [isUseLongBreaks, setIsUseLongBreaks] = useState(isUseLongBreaksDefault);
  const [longBreakDuration, setLongBreakDuration] = useState(longBreakDurationDefault);
  const [longBreakGap, setLongBreakGap] = useState(longBreakGapDefault);

  const [
    isUseFocusIntervalsTarget,
    setIsUseFocusIntervalsTarget,
  ] = useState(isUseFocusIntervalsTargetDefault);
  const [focusIntervalsTarget, setFocusIntervalsTarget] = useState(focusIntervalsTargetDefault);

  const [isUseSound, setIsUseSound] = useState(isUseSoundDefault);

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
