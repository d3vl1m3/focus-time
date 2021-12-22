import { VoidFunctionComponent } from 'react';
import {
  useGameStateContext,
  useTimerStateContext,
} from '../../contexts';
import { CounterPresenter } from './counter.presenter';

export const Counter: VoidFunctionComponent = () => {
  const { isCompleted } = useGameStateContext();
  const { timeInMs } = useTimerStateContext();
  return (
    <CounterPresenter
      isCompleted={isCompleted}
      timeInMs={timeInMs}
    />
  );
};
