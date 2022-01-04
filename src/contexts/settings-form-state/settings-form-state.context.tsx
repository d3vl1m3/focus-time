import { useSettingsStateContext } from '@contexts';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SettingsFormStateContextValues = {
  settingsFormValues: SettingsFormInputs,
  updateSettingsFormValue: (name: keyof SettingsFormInputs, value: number|boolean) => void
}

const SettingsFormStateContext = createContext<SettingsFormStateContextValues | undefined>(undefined);

export const useSettingsFormStateContext = () => {
  const context = useContext(SettingsFormStateContext);
  if (context === undefined) {
    throw new Error('useSettingsFormValuesContext must be inside a SettingsFormValuesProvider');
  }

  return context;
};

export interface SettingsFormInputs {
  focusDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number,

  isUseLongBreaks: boolean,
  longBreakGap: number,

  isUseFocusIntervalsTarget: boolean,
  focusIntervalsTarget: number,
}

export const SettingsFormStateProvider: FunctionComponent = ({
  children,
}) => {
  const {
    // Interval durations settings
    focusDuration,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,

    // Long break settings
    isUseLongBreaks,
    longBreakDuration,

    // Focus intervals target settings
    longBreakGap,
    shortBreakDuration,
  } = useSettingsStateContext();

  // Interval durations fieldset
  const [settingsFormValues, setSettingsFormValues] = useState<SettingsFormInputs>({
    focusDuration,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,
    shortBreakDuration,
  });

  const values = useMemo(() => ({
    settingsFormValues,
    updateSettingsFormValue: (name: keyof SettingsFormInputs, value: number|boolean) => {
      setSettingsFormValues({ ...settingsFormValues, [name]: value });
    },
  }), [settingsFormValues]);

  return (
    <SettingsFormStateContext.Provider value={values}>
      {children}
    </SettingsFormStateContext.Provider>
  );
};
