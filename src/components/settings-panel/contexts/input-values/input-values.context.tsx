import { createContext, FunctionComponent, useContext, useMemo, useState } from 'react';

import { SetStateType } from '../../../../types/set-state/set-state.type';
import { useGameStateContext } from '../../../pomodoro-timer/contexts';

type SettingsFormValuesContextValues = {
  focusDurationFormValue: number,
  setFocusDurationFormValue: SetStateType<number>,

  shortBreakDurationFormValue: number,
  setShortBreakDurationFormValue: SetStateType<number>,

  longBreakDurationFormValue: number,
  setLongBreakDurationFormValue: SetStateType<number>,

  longBreakGapFormValue: number,
  setLongBreakGapFormValue: SetStateType<number>,

  isUseLongBreaksFormValue: boolean,
  setIsUseLongBreaksFormValue: SetStateType<boolean>,

  focusIntervalTargetFormValue: number,
  setFocusIntervalTargetFormValue: SetStateType<number>,

  isUseFocusIntervalTargetFormValue: boolean,
  setIsUseFocusIntervalTargetFormValue: SetStateType<boolean>,
};

const SettingsFormValuesContext = createContext<SettingsFormValuesContextValues | undefined>(undefined);

export const useSettingsFormValuesContext = () => {
  const context = useContext(SettingsFormValuesContext);
  if (context === undefined) {
    throw new Error('useSettingsFormValuesContext must be inside a SettingsFormValuesProvider');
  }

  return context;
};

export const SettingsFormValuesProvider: FunctionComponent = ({
  children,
}) => {

  const {
    // Interval durations settings
    focusDuration,
    shortBreakDuration,
    longBreakDuration,

    // Long break settings
    longBreakGap,
    isUseLongBreaks,

    // Focus interval target settings
    targetFocusIntervals,
    isUseTargetFocusIntervals,

    // utility
    durationInMinutes,
  } = useGameStateContext();

  // Interval durations fieldset
  const [focusDurationFormValue, setFocusDurationFormValue] = useState(durationInMinutes(focusDuration));
  const [shortBreakDurationFormValue, setShortBreakDurationFormValue] = useState(durationInMinutes(shortBreakDuration));

  // Long breaks fieldset
  const [longBreakDurationFormValue, setLongBreakDurationFormValue] = useState(durationInMinutes(longBreakDuration));
  const [longBreakGapFormValue, setLongBreakGapFormValue] = useState(longBreakGap);

  const [isUseLongBreaksFormValue, setIsUseLongBreaksFormValue] = useState(isUseLongBreaks);

  // Focus intervals fieldset
  const [focusIntervalTargetFormValue, setFocusIntervalTargetFormValue] = useState(targetFocusIntervals);

  const [isUseFocusIntervalTargetFormValue, setIsUseFocusIntervalTargetFormValue] = useState(isUseTargetFocusIntervals);

  const values = useMemo(() => ({
    focusDurationFormValue,
    setFocusDurationFormValue,

    shortBreakDurationFormValue,
    setShortBreakDurationFormValue,

    longBreakDurationFormValue,
    setLongBreakDurationFormValue,

    longBreakGapFormValue,
    setLongBreakGapFormValue,

    isUseLongBreaksFormValue,
    setIsUseLongBreaksFormValue,

    focusIntervalTargetFormValue,
    setFocusIntervalTargetFormValue,

    isUseFocusIntervalTargetFormValue,
    setIsUseFocusIntervalTargetFormValue,
  }), [
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
