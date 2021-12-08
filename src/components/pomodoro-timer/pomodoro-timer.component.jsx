import React from 'react';
import styles from './pomodoro-timer.module.css';
import {
  Controls,
  Counter,
  PomodoroStateIndicator,
} from './components';

export const PomodoroTimer = () => (
  <div className={styles.pomodoroTimer}>
    <PomodoroStateIndicator />
    <Counter />
    <Controls />
  </div>
);
