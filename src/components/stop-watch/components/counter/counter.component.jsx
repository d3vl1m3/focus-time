import React from 'react';
import styles from './counter.module.css';

export const Counter = ({ time }) => (
  <div className={styles.counter}>
    {(`0${Math.floor((time / 60000))}`).slice(-2)}
    :
    {(`0${Math.floor((time / 1000) % 60)}`).slice(-2)}
  </div>
);
