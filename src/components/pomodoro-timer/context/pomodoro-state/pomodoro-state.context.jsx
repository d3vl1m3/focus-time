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
    pomodoroLength,
    shortBreakLength,
  } = useGameStateContext();

  const {
    isSkipping,
    setIsSkipping,
    setTime,
    time,
  } = useTimerStateContext();

  /**
   * Trigger pomodoroState updates based on thew current state of the app. Specifically
   * where the next pomodoroState will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
    // POMODORO -> BREAK
    if (
      pomodoroState === 'POMODORO'
      && (time >= pomodoroLength || isSkipping)
    ) {
      setPomodoroState('SHORT_BREAK');
      setTime(0);
    }

    // BREAK -> POMODORO
    if (
      pomodoroState === 'SHORT_BREAK'
      && (time >= shortBreakLength || isSkipping
      )
    ) {
      setPomodoroState('POMODORO');
      setTime(0);
    }

    // assure IsSkipping is reset
    if (isSkipping) {
      setIsSkipping(false);
    }
  }, [time, isSkipping]);

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
