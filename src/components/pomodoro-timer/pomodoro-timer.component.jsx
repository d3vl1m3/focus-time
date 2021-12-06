import React from 'react';
import styles from './pomodoro-timer.module.css';
import { ControlsComponent } from './components/controls/controls.component';
import {
  PomodoroStateIndicatorComponent,
} from './components/pomodoro-state-indicator/pomodoro-state-indicator.component';
import { CounterComponent } from './components/counter-component/counter.component';

export const PomodoroTimerComponent = () => (
  <div className={styles.pomodoroTimer}>
    <PomodoroStateIndicatorComponent />
    <CounterComponent />
    <ControlsComponent />
  </div>
);
