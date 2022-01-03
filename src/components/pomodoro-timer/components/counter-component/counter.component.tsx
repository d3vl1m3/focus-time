import {
  useGameStateContext,
  useTimerStateContext,
} from '@contexts';
import { VoidFunctionComponent } from 'react';

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
