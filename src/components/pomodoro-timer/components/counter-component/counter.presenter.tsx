import { msToTimer } from '@utils';
import { VoidFunctionComponent } from 'react';

import styles from './counter.module.css';

export interface CounterPresenterProps {
  isCompleted?: boolean,
  timeInMs?: number
}

export const CounterPresenter: VoidFunctionComponent<CounterPresenterProps> = ({
  isCompleted= false,
  timeInMs= 0,
}) => (
  <div className={styles.counter}>
    {
      isCompleted
        ? <p>Completed</p>
        : (
          <span role="timer">
            {msToTimer(timeInMs)}
          </span>
        )
    }
  </div>
);
