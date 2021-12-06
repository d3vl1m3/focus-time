import React from 'react';

import { useGameStateContext } from '../../context/game-state/game-state.context';
import { useTimerStateContext } from '../../context/timer-state/timer-state.context';
import { CounterPresenter } from './counter.presenter';

export const CounterComponent = () => {
  const { isCompleted } = useGameStateContext();
  const { time } = useTimerStateContext();
  return (
    <CounterPresenter
      isCompleted={isCompleted}
      time={time}
    />
  );
};
