import { createContext, FunctionComponent, useContext, useMemo, useState } from 'react';

import { msToMinutes } from '../../../../utility/functions';
import { useGameStateContext } from '../../../pomodoro-timer/contexts';

type SettingsFormValuesContextValues = {
  settingsFormValues: SettingsFormInputs,
  updateSettingsFormValue: (name: keyof SettingsFormInputs, value: number|boolean) => void
}

const SettingsFormValuesContext = createContext<SettingsFormValuesContextValues | undefined>(undefined);

export const useSettingsFormValuesContext = () => {
  const context = useContext(SettingsFormValuesContext);
  if (context === undefined) {
    throw new Error('useSettingsFormValuesContext must be inside a SettingsFormValuesProvider');
  }

  return context;
};

interface SettingsFormInputs {
  'focus_duration': number,
  'short_break_duration': number,
  'long_break_duration': number,

  'is_use_long_breaks': boolean,
  'long_break_gap': number,

  'is_use_focus_intervals_target': boolean,
  'focus_intervals_target': number,
}

export const SettingsFormValuesProvider: FunctionComponent = ({
  children,
}) => {
  const {
    // Interval durations settings
    focusDuration,
    shortBreakDuration,
    longBreakDuration,

    // Long break settings
    isUseLongBreaks,
    longBreakGap,

    // Focus interval target settings
    isUseFocusIntervalsTarget,
    focusIntervalsTarget,
  } = useGameStateContext();

  // Interval durations fieldset
  const [settingsFormValues, setSettingsFormValues] = useState<SettingsFormInputs>({
    'focus_duration': msToMinutes(focusDuration),
    'short_break_duration': msToMinutes(shortBreakDuration),
    'long_break_duration': msToMinutes(longBreakDuration),

    'is_use_long_breaks': isUseLongBreaks,
    'long_break_gap': longBreakGap,

    'is_use_focus_intervals_target': isUseFocusIntervalsTarget,
    'focus_intervals_target': focusIntervalsTarget,
  });

  const values = useMemo(() => ({
    settingsFormValues,
    updateSettingsFormValue: (name: keyof SettingsFormInputs, value: number|boolean) => {
      setSettingsFormValues({ ...settingsFormValues, [name]: value })
    },
  }), [
    settingsFormValues,
  ]);

  return (
    <SettingsFormValuesContext.Provider value={values}>
      {children}
    </SettingsFormValuesContext.Provider>
  );
};
