import { useGameStateContext } from '@contexts/game-state/game-state.context';
import { useIntervalStatusContext } from '@contexts/interval-status/interval-status.context';
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
    setIntervalStatus,
  } = useIntervalStatusContext();

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
        case ('INITIAL'):
          setFocusIntervalsCompleted(0);
          setIsActive(false);
          setIsCompleted(false);
          setIsFirstInterval(true);
          setIsPaused(true);
          setIntervalStatus('INITIAL');
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
    setIntervalStatus,
    setTimeInMs,
  ]);
};