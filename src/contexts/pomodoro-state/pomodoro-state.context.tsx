import {
  PomodoroStateType,
  SetStateType, 
} from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useGameStateContext } from '../game-state/game-state.context';
import { useTimerStateContext } from '../timer-state/timer-state.context';

export type PomodoroStateContextValues = {
  pomodoroState: PomodoroStateType,
  setPomodoroState: SetStateType<PomodoroStateType>
};

const PomodoroStateContext = createContext<PomodoroStateContextValues | undefined>(undefined);

export const usePomodoroStateContext = () => {
  const context = useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroStateContext must be inside a PomodoroStateProvider');
  }

  return context;
};

export const PomodoroStateProvider: FunctionComponent = ({ children }) => {
  const [pomodoroState, setPomodoroState] = useState<PomodoroStateType>('RESET');
  const {
    focusDuration,
    shortBreakDuration,
    longBreakDuration,
    isUseLongBreaks,
    longBreakGap,
    focusIntervalsCompleted,
    setFocusIntervalsCompleted,
    isFirstInterval,
    setIsFirstInterval,
  } = useGameStateContext();

  const {
    isActive,
    isSkipping,
    setIsSkipping,
    timeInMs,
    setTimeInMs,
  } = useTimerStateContext();

  /**
   * Trigger pomodoroState updates based on thew current state of the app. Specifically
   * where the next pomodoroState will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
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

    // starting a new or reset timer
    if (isActive && isFirstInterval) {
      setPomodoroState('FOCUS');
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
        setTimeInMs(focusDuration);

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
  }, [
    timeInMs,
    isActive,
    isSkipping,
    isFirstInterval,
    setTimeInMs,
    focusDuration,
    setIsFirstInterval,
    setFocusIntervalsCompleted,
    shortBreakDuration,
    longBreakDuration,
    setIsSkipping,
    isUseLongBreaks,
    focusIntervalsCompleted,
    longBreakGap,
    pomodoroState,
  ]);

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
