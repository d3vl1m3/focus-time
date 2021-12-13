import {VoidFunctionComponent} from 'react';
import styles from './counter.module.css';

interface CounterPresenterProps {
  isCompleted: boolean,
  timeInMs: number
}

export const CounterPresenter: VoidFunctionComponent<CounterPresenterProps> = ({
  isCompleted,
  timeInMs,
}) => (
  <div className={styles.counter}>
    {
      isCompleted
        ? <p>Fin.</p>
        : (
          <>
            {(`0${Math.floor((timeInMs / 60000))}`).slice(-2)}
            :
            {(`0${Math.floor((timeInMs / 1000) % 60)}`).slice(-2)}
          </>
        )
    }
  </div>
);
