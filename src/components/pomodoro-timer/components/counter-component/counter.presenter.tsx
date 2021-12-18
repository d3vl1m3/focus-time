import {VoidFunctionComponent} from 'react';
import styles from './counter.module.css';
import {msToTimer} from '../../../../utility/functions/ms-to-timer/ms-to-timer';

interface CounterPresenterProps {
  isCompleted: boolean,
  timeInMs: number
}

export const CounterPresenter: VoidFunctionComponent<CounterPresenterProps> = (
  {
    isCompleted,
    timeInMs,
  }) => (
  <div className={styles.counter}>
    {
      isCompleted
        ? <p>Fin.</p>
        : (
          <>
            {msToTimer(timeInMs)}
          </>
        )
    }
  </div>
);
