import React from 'react';
import styles from './counter.module.css';

export const CounterPresenter = ({
  isCompleted,
  time,
}) => (
  <div className={styles.counter}>
    {
      isCompleted
        ? <p>Fin.</p>
        : (
          <>
            {(`0${Math.floor((time / 60000))}`).slice(-2)}
            :
            {(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}
          </>
        )
    }
  </div>
);
