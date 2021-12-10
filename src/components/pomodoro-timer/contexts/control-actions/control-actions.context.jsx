import React, {
  createContext,
  useContext,
  useMemo,
} from 'react';
import { useGameStateContext } from '../game-state/game-state.context';
import { usePomodoroStateContext } from '../pomodoro-state/pomodoro-state.context';
import { useTimerStateContext } from '../timer-state/timer-state.context';

const ControlActionsContext = createContext(undefined);

export const useControlActionsContext = () => {
  const context = useContext(ControlActionsContext);
  if (context === undefined) {
    throw new Error('useControlActionsContext must be inside a ControlActionsProvider');
  }

  return context;
};

export const ControlActionsProvider = ({ children }) => {
  const {
    setIsActive,
    setIsPaused,
    setIsSkipping,
    setTime,
  } = useTimerStateContext();

  const {
    setPomodoroState,
  } = usePomodoroStateContext();

  const {
    setIsCompleted,
    setIsFirstInterval,
    setFocusIntervalsCompleted,
  } = useGameStateContext();

  const controlActionReducer = (action) => {
    switch (action.type) {
      case ('START'):
        setIsPaused(false);
        setIsActive(true);
        break;
      case ('PAUSE'):
        setIsPaused(true);
        setIsActive(true);
        break;
      case ('SKIP'):
        setIsActive(true);
        setIsSkipping(true);
        break;
      case ('RESET'):
        setFocusIntervalsCompleted(0);
        setIsActive(false);
        setIsCompleted(false);
        setIsFirstInterval(true);
        setIsPaused(true);
        setPomodoroState('FOCUS');
        setTime(0);
        break;
      default:
        break;
    }
  };

  const values = useMemo(() => ({
    controlActionReducer,
  }), [controlActionReducer]);

  return (
    <ControlActionsContext.Provider value={values}>
      {children}
    </ControlActionsContext.Provider>
  );
};
