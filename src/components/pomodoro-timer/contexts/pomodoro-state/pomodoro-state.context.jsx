import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useGameStateContext } from '../game-state/game-state.context';
import { useTimerStateContext } from '../timer-state/timer-state.context';

const PomodoroStateContext = createContext(undefined);

export const usePomodoroStateContext = () => {
  const context = useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroStateContext must be inside a PomodoroStateProvider');
  }

  return context;
};

export const PomodoroStateProvider = ({ children }) => {
  const [pomodoroState, setPomodoroState] = useState('FOCUS');
  const {
    longBreakGap,
    longBreakDuration,
    focusDuration,
    focusIntervalsCompleted,
    isFirstInterval,
    isUseLongBreaks,
    isUseTargetFocusIntervals,
    setFocusIntervalsCompleted,
    setIsFirstInterval,
    shortBreakDuration,
    targetFocusIntervals,
    setIsCompleted,
  } = useGameStateContext();

  const {
    isActive,
    isSkipping,
    setIsPaused,
    setIsSkipping,
    setTime,
    time,
  } = useTimerStateContext();

  /*
   * The below `is*()` methods are excessive but worth the trade-off as they help with readability in the
   * meat of the logic
   */
  const endOfInterval = (state = '', allowSkip = true) => (
    pomodoroState === state
    && (
      time <= 0
      || (allowSkip && isSkipping)
    )
  );

  const isAnyBreakFinished = () => (
    endOfInterval('SHORT_BREAK')
    || endOfInterval('LONG_BREAK')
  );

  const isWorkIntervalFinished = (allowSkip = true) => endOfInterval('FOCUS', allowSkip);

  const isLongBreakGoalMet = () => isUseLongBreaks && focusIntervalsCompleted % longBreakGap === (longBreakGap - 1);

  /**
   * Trigger pomodoroState updates based on thew current state of the app. Specifically
   * where the next pomodoroState will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
    // starting a new or reset timer
    if (isActive && isFirstInterval) {
      setTime(focusDuration);
      setIsFirstInterval(false);
    } else if (isActive) {
      // End of a pomodoro that isn't skipped, increase the counter and reset the timer
      if (isWorkIntervalFinished()) {
        setFocusIntervalsCompleted((p) => p + 1);
      }

      // Contextually Update the PomodoroState
      if (isAnyBreakFinished()) {
        setPomodoroState('FOCUS');
        setTime(focusDuration);
      } else if (isWorkIntervalFinished() && !isLongBreakGoalMet()) {
        setPomodoroState('SHORT_BREAK');
        setTime(shortBreakDuration);
      } else if (isWorkIntervalFinished() && isLongBreakGoalMet()) {
        setPomodoroState('LONG_BREAK');
        setTime(longBreakDuration);
      }

      if (isSkipping) {
        setIsSkipping(false);
      }
    }
  }, [time, isActive, isSkipping]);

  /**
   * Checks to see if the user has reached their pomodoro goal
   */
  useEffect(() => {
    if (isUseTargetFocusIntervals && focusIntervalsCompleted >= targetFocusIntervals) {
      setPomodoroState('COMPLETED');
      setIsPaused(true);
      setIsCompleted(true);
    }
  }, [focusIntervalsCompleted]);

  const values = useMemo(() => ({
    pomodoroState,
    setPomodoroState,
  }), [pomodoroState]);

  return (
    <PomodoroStateContext.Provider value={values}>
      {children}
    </PomodoroStateContext.Provider>
  );
};
