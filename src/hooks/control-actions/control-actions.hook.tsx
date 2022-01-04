import { useGameStateContext } from '@contexts/game-state/game-state.context';
import { usePomodoroStateContext } from '@contexts/pomodoro-state/pomodoro-state.context';
import { useTimerStateContext } from '@contexts/timer-state/timer-state.context';
import { ControlActionsType } from '@types';
import { useMemo } from 'react';

export type ControlActionsContextValues = {
  controlActionReducer: (action: Action) => void
};

type Action = {
  type: ControlActionsType
};

export const useControlActions = () => {
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
    setFocusIntervalsCompleted,
    setIsCompleted,
    setIsFirstInterval,
  } = useGameStateContext();

  return useMemo(() => ({
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
};