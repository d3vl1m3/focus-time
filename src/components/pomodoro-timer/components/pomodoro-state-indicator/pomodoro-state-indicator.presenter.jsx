import React from 'react';
import styles from './pomodoro-state-indicator.module.css';

export const PomodoroStateIndicatorPresenter = ({ pomodoroState }) => (
  <ul className={styles.indicators}>
    <li className={`${styles.indicator} ${pomodoroState === 'POMODORO' ? styles.indicatorActive : ''}`}>Pomodoro</li>
    <li className={`${styles.indicator} ${pomodoroState === 'SHORT_BREAK' ? styles.indicatorActive : ''}`}>
      Short break
    </li>
    <li className={`${styles.indicator} ${pomodoroState === 'LONG_BREAK' ? styles.indicatorActive : ''}`}>
      Long break
    </li>
  </ul>
);
