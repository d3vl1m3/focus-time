import { useGameStateContext } from '@contexts/game-state/game-state.context';
import { msToMinutes } from '@utils';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

export type SettingsFormValuesContextValues = {
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
  focusDuration: number,
  shortBreakDuration: number,
  longBreakDuration: number,

  isUseLongBreaks: boolean,
  longBreakGap: number,

  isUseFocusIntervalsTarget: boolean,
  focusIntervalsTarget: number,
}

export const SettingsFormValuesProvider: FunctionComponent = ({
  children,
}) => {
  const {
    // Interval durations settings
    focusDuration: focusDuration,
    shortBreakDuration,
    longBreakDuration,

    // Long break settings
    isUseLongBreaks,
    longBreakGap,

    // Focus intervals target settings
    isUseFocusIntervalsTarget,
    focusIntervalsTarget,
  } = useGameStateContext();

  // Interval durations fieldset
  const [settingsFormValues, setSettingsFormValues] = useState<SettingsFormInputs>({
    focusDuration: msToMinutes(focusDuration),
    shortBreakDuration: msToMinutes(shortBreakDuration),
    longBreakDuration: msToMinutes(longBreakDuration),
    isUseLongBreaks,
    longBreakGap,
    isUseFocusIntervalsTarget,
    focusIntervalsTarget,

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
