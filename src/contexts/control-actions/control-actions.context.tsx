import { ControlActionsType } from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
} from 'react';

import { useGameStateContext } from '../game-state/game-state.context';
import { usePomodoroStateContext } from '../pomodoro-state/pomodoro-state.context';
import { useTimerStateContext } from '../timer-state/timer-state.context';

export type ControlActionsContextValues = {
  controlActionReducer: (action: Action) => void
};

type Action = {
  type: ControlActionsType
};

const ControlActionsContext = createContext<ControlActionsContextValues | undefined>(undefined);

export const useControlActionsContext = () => {
  const context = useContext(ControlActionsContext);
  if (context === undefined) {
    throw new Error('useControlActionsContext must be inside a ControlActionsProvider');
  }

  return context;
};

export const ControlActionsProvider: FunctionComponent = ({ children }) => {
  const {
    setIsActive,
    setIsPaused,
    setIsSkipping,
    setTimeInMs,
  } = useTimerStateContext();

  const {
    setPomodoroState,
  } = usePomodoroStateContext();

  const {
    setIsCompleted,
    setIsFirstInterval,
    setFocusIntervalsCompleted,
  } = useGameStateContext();

  const values = useMemo(() => ({
    controlActionReducer: (action: Action) => {
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
          setPomodoroState('RESET');
          setTimeInMs(0);
          break;
        default:
          break;
      }
    },
  }), [
    setFocusIntervalsCompleted,
    setIsActive,
    setIsCompleted,
    setIsFirstInterval,
    setIsPaused,
    setIsSkipping,
    setPomodoroState,
    setTimeInMs,
  ]);

  return (
    <ControlActionsContext.Provider value={values}>
      {children}
    </ControlActionsContext.Provider>
  );
};
