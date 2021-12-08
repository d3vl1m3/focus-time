import React from 'react';
import {
  useGameStateContext,
  useTimerStateContext,
} from '../../contexts';
import { CounterPresenter } from './counter.presenter';

export const Counter = () => {
  const { isCompleted } = useGameStateContext();
  const { time } = useTimerStateContext();
  return (
    <CounterPresenter
      isCompleted={isCompleted}
      time={time}
    />
  );
};
