import React from 'react';
import styles from './counter.module.css';
import { useTimerStateContext } from '../../context/timer-state/timer-state.context';

export const CounterComponent = () => {
  const { time } = useTimerStateContext();

  return (
    <div className={styles.counter}>
      {(`0${Math.floor((time / 60000))}`).slice(-2)}
      :
      {(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}
    </div>
  );
};
