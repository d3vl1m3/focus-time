import { useMemo } from 'react';

export type DefaultSettingsValue = {
  focusDuration: number,
  focusIntervalsTarget: number,
  isUseFocusIntervalsTarget: boolean,
  isUseLongBreaks: boolean,
  isUseSound: boolean,
  longBreakDuration: number,
  longBreakGap: number,
  shortBreakDuration: number,
}

export const defaultValues = {
  focusDuration: 25,
  focusIntervalsTarget: 8,
  isUseFocusIntervalsTarget: false,
  isUseLongBreaks: false,
  isUseSound: false,
  longBreakDuration: 10,
  longBreakGap: 4,
  shortBreakDuration: 5,
};

export const useDefaultSettingsValues: () => DefaultSettingsValue = () => {
  return useMemo(() => defaultValues, []);
};
