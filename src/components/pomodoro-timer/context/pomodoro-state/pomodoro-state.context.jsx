import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTimerStateContext } from '../timer-state/timer-state.context';
import { useGameStateContext } from '../game-state/game-state.context';

const PomodoroStateContext = createContext(undefined);

export const usePomodoroStateContext = () => {
  const context = useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroStateContext must be inside a PomodoroStateProvider');
  }

  return context;
};

export const PomodoroStateProvider = ({ children }) => {
  const [pomodoroState, setPomodoroState] = useState('POMODORO');
  const {
    longBreakGoal,
    longBreakLength,
    pomodoroLength,
    pomodorosCompleted,
    setPomodorosCompleted,
    shortBreakLength,
    targetPomodoros,
    setIsCompleted,
  } = useGameStateContext();

  const {
    setIsPaused,
    isSkipping,
    setIsSkipping,
    setTime,
    time,
  } = useTimerStateContext();

  const statePairings = {
    POMODORO: {
      time: pomodoroLength,
    },
    SHORT_BREAK: {
      time: shortBreakLength,
    },
    LONG_BREAK: {
      time: longBreakLength,
    },
  };

  /*
   * The below `is*()` methods are excessive but worth the trade-off as they help with readability in the
   * meat of the logic
   */
  const endOfInterval = (state = '', allowSkip = true) => (
    pomodoroState === state
    && (
      time >= statePairings[state].time
      || (allowSkip && isSkipping)
    )
  );

  const isBreakFinished = (allowSkip = true) => (
    endOfInterval('SHORT_BREAK', allowSkip)
    || endOfInterval('LONG_BREAK', allowSkip)
  );

  const isPomodoroFinished = (allowSkip = true) => endOfInterval('POMODORO', allowSkip);
  const isIntervalFinished = () => isPomodoroFinished() || isBreakFinished();

  const isLongBreakGoalMet = () => pomodorosCompleted % longBreakGoal !== (longBreakGoal - 1);

  /**
   * Trigger pomodoroState updates based on thew current state of the app. Specifically
   * where the next pomodoroState will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
    // End of a pomodoro that isn't skipped, increase the counter and reset the timer
    if (isPomodoroFinished(false)) {
      setPomodorosCompleted((p) => p + 1);
    }

    // Contextually Update the PomodoroState
    if (isBreakFinished()) {
      setPomodoroState('POMODORO');
    } else if (isPomodoroFinished() && isLongBreakGoalMet()) {
      setPomodoroState('SHORT_BREAK');
    } else if (isPomodoroFinished() && !isLongBreakGoalMet()) {
      setPomodoroState('LONG_BREAK');
    }

    // Reset the timer to zero at the end of any interval
    if (isIntervalFinished()) {
      setTime(0);
    }

    // Reset `isSkipping` if required
    if (isSkipping) {
      setIsSkipping(false);
    }
  }, [time, isSkipping]);

  /**
   * Checks to see if the user has reached their pomodoro goal
   */
  useEffect(() => {
    if (pomodorosCompleted === targetPomodoros) {
      setPomodoroState('COMPLETED');
      setIsPaused(true);
      setIsCompleted(true);
    }
  }, [pomodorosCompleted]);

  const values = useMemo(() => ({
    pomodoroState,
    setPomodoroState,
  }));

  return (
    <PomodoroStateContext.Provider value={values}>
      {children}
    </PomodoroStateContext.Provider>
  );
};
