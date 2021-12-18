import {createContext, FunctionComponent, useContext, useEffect, useMemo, useState,} from 'react';
import {SetStateType} from '../../../../types/set-state/set-state.type';

import {useGameStateContext} from '../game-state/game-state.context';
import {useTimerStateContext} from '../timer-state/timer-state.context';

import {PomodoroStateType} from '../../../../types/pomodoro-state/pomodoro-state.type';

type PomodoroStateContextValues = {
  pomodoroState: PomodoroStateType,
  setPomodoroState: SetStateType<PomodoroStateType>
}

const PomodoroStateContext = createContext<PomodoroStateContextValues | undefined>(undefined);

export const usePomodoroStateContext = () => {
  const context = useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroStateContext must be inside a PomodoroStateProvider');
  }

  return context;
};

export const PomodoroStateProvider: FunctionComponent = ({children}) => {
  const [pomodoroState, setPomodoroState] = useState<PomodoroStateType>('FOCUS');
  const {
    focusDuration,
    shortBreakDuration,

    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,

    isUseTargetFocusIntervals,
    targetFocusIntervals,
    setFocusIntervalsCompleted,
    focusIntervalsCompleted,

    setIsFirstInterval,
    isFirstInterval,
    setIsCompleted,
  } = useGameStateContext();

  const {
    isActive,

    setIsSkipping,
    isSkipping,

    setIsPaused,

    setTimeInMs,
    timeInMs,
  } = useTimerStateContext();

  /*
   * The below `is*()` methods are excessive but worth the trade-off as they help with readability in the
   * meat of the logic
   */
  const endOfInterval = (state = '') => (
    pomodoroState === state
    && (
      timeInMs <= 0
      || isSkipping
    )
  );

  const isAnyBreakFinished = () => (
    endOfInterval('SHORT_BREAK')
    || endOfInterval('LONG_BREAK')
  );

  const isWorkIntervalFinished = () => endOfInterval('FOCUS');

  const isLongBreakGoalMet = () => isUseLongBreaks && focusIntervalsCompleted % longBreakGap === (longBreakGap - 1);

  /**
   * Trigger pomodoroState updates based on thew current state of the app. Specifically
   * where the next pomodoroState will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
    // starting a new or reset timer
    if (isActive && isFirstInterval) {
      setTimeInMs(focusDuration);
      setIsFirstInterval(false);

    } else if (isActive) {
      // End of a pomodoro that isn't skipped, increase the counter and reset the timer
      if (isWorkIntervalFinished()) {
        setFocusIntervalsCompleted((p) => p + 1);
      }

      // Contextually Update the PomodoroState
      if (isAnyBreakFinished()) {
        setPomodoroState('FOCUS');
        setTimeInMs(focusDuration)

      } else if (isWorkIntervalFinished() && !isLongBreakGoalMet()) {
        setPomodoroState('SHORT_BREAK');
        setTimeInMs(shortBreakDuration);

      } else if (isWorkIntervalFinished() && isLongBreakGoalMet()) {
        setPomodoroState('LONG_BREAK');
        setTimeInMs(longBreakDuration);

      }

      if (isSkipping) {
        setIsSkipping(false);
      }
    }
  }, [timeInMs, isActive, isSkipping]);

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
