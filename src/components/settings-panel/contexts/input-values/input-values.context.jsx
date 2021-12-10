import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import { useGameStateContext } from '../../../pomodoro-timer/contexts';

const SettingsFormValuesContext = createContext(undefined);

export const useSettingsFormValuesContext = () => {
  const context = useContext(SettingsFormValuesContext);
  if (context === undefined) {
    throw new Error('useSettingsFormValuesContext must be inside a SettingsFormValuesProvider');
  }

  return context;
};

export const SettingsFormValuesProvider = ({ children }) => {
  const {
    // Interval durations settings
    focusDuration,
    shortBreakDuration,
    longBreakDuration,

    // Long break settings
    isUseLongBreaks,
    longBreakGap,

    // Focus interval target settings
    isUseTargetFocusIntervals,
    targetFocusIntervals,

    // utility
    durationInMinutes,
  } = useGameStateContext();

  // Interval durations fieldset
  const focusDurationInMinutes = durationInMinutes(focusDuration);
  const [focusDurationFormValue, setFocusDurationFormValue] = useState(focusDurationInMinutes);
  const shortBreakDurationInMinutes = durationInMinutes(shortBreakDuration);
  const [shortBreakDurationFormValue, setShortBreakDurationFormValue] = useState(shortBreakDurationInMinutes);

  // Long breaks fieldset
  const longBreakDurationInMinutes = durationInMinutes(longBreakDuration);
  const [isUseLongBreaksFormValue, setIsUseLongBreaksFormValue] = useState(isUseLongBreaks);
  const [longBreakDurationFormValue, setLongBreakDurationFormValue] = useState(longBreakDurationInMinutes);
  const [longBreakGapFormValue, setLongBreakGapFormValue] = useState(longBreakGap);

  // Focus intervals fieldset
  const [isUseFocusIntervalTargetFormValue, setIsUseFocusIntervalTargetFormValue] = useState(isUseTargetFocusIntervals);
  const [focusIntervalTargetFormValue, setFocusIntervalTargetFormValue] = useState(targetFocusIntervals);

  const values = useMemo(() => ({
    focusDurationInMinutes,
    focusDurationFormValue,
    setFocusDurationFormValue,

    shortBreakDurationFormValue,
    setShortBreakDurationFormValue,

    isUseLongBreaksFormValue,
    setIsUseLongBreaksFormValue,
    longBreakDurationFormValue,
    setLongBreakDurationFormValue,
    longBreakGapFormValue,
    setLongBreakGapFormValue,
    isUseFocusIntervalTargetFormValue,
    setIsUseFocusIntervalTargetFormValue,

    focusIntervalTargetFormValue,
    setFocusIntervalTargetFormValue,
  }), [
    focusDurationInMinutes,
    focusDurationFormValue,

    shortBreakDurationFormValue,

    isUseLongBreaksFormValue,
    longBreakDurationFormValue,
    longBreakGapFormValue,

    isUseFocusIntervalTargetFormValue,
    focusIntervalTargetFormValue,
  ]);

  return (
    <SettingsFormValuesContext.Provider value={values}>
      {children}
    </SettingsFormValuesContext.Provider>
  );
};
