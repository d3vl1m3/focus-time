import { defaultSettingValues } from '@data';
import {
  FunctionComponent, useMemo, useState, 
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

  const values = useMemo(() => ({
    focusDuration,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    isUseSound,
    longBreakDuration,
    longBreakGap,
    setFocusDuration,
    setFocusIntervalsTarget,
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