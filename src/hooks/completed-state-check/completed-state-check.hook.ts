import {
  useGameStateContext, useIntervalStatusContext, useSettingsStateContext, useTimerStateContext,
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

  const { setIntervalStatus } = useIntervalStatusContext();
  const { setIsPaused } = useTimerStateContext();

  /**
   * Checks to see if the user has reached their pomodoro goal
   */
  useEffect(() => {
    if (isUseFocusIntervalsTarget && focusIntervalsCompleted >= focusIntervalsTarget) {
      setIntervalStatus('COMPLETED');
      setIsPaused(true);
      setIsCompleted(true);
    }
  }, [
    focusIntervalsCompleted,
    focusIntervalsTarget,
    isUseFocusIntervalsTarget,
    setIsCompleted,
    setIsPaused,
    setIntervalStatus,
  ]);
};
