import React from 'react';
import styles from './pomodoro-state-indicator.module.css';
import { usePomodoroStateContext } from '../../context/pomodoro-state/pomodoro-state.context';

export const PomodoroStateIndicatorComponent = () => {
  const { pomodoroState } = usePomodoroStateContext();

  return (
    <ul className={styles.indicators}>
      <li className={`${styles.indicator} ${pomodoroState === 'POMODORO' ? styles.indicatorActive : ''}`}>Pomodoro</li>
      <li className={`${styles.indicator} ${pomodoroState === 'SHORT_BREAK' ? styles.indicatorActive : ''}`}>
        Short break
      </li>
    </ul>
  );
};
