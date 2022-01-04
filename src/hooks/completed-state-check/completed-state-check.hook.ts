import {
  useGameStateContext, usePomodoroStateContext, useSettingsStateContext, useTimerStateContext,
} from '@contexts';
import { useEffect } from "react";

export const useCompletedStateCheck = () => {
  const {
    focusIntervalsCompleted,
    setIsCompleted,
  } = useGameStateContext();

  const {
    isUseFocusIntervalsTarget,
    focusIntervalsTarget,
  } = useSettingsStateContext();

  const { setPomodoroState } = usePomodoroStateContext();
  const { setIsPaused } = useTimerStateContext();

  /**
   * Checks to see if the user has reached their pomodoro goal
   */
  useEffect(() => {
    if (isUseFocusIntervalsTarget && focusIntervalsCompleted >= focusIntervalsTarget) {
      setPomodoroState('COMPLETED');
      setIsPaused(true);
      setIsCompleted(true);
    }
  }, [
    focusIntervalsCompleted,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    setIsCompleted,
    setIsPaused,
    setPomodoroState,
  ]);
};
