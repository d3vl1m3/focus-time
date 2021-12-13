import styles from './pomodoro-timer.module.css';
import {
  Controls,
  Counter,
  PomodoroStateIndicator,
} from './components';

import {VoidFunctionComponent} from 'react';

export const PomodoroTimer: VoidFunctionComponent = () => (
  <div className={styles.pomodoroTimer}>
    <PomodoroStateIndicator/>
    <Counter/>
    <Controls/>
  </div>
);
