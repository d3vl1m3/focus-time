import React from 'react';
import { TimerStateProvider } from './context/timer-state/timer-state.context';
import { GameStateProvider } from './context/game-state/game-state.context';
import { ControlActionsProvider } from './context/control-actions/control-actions.context';
import { PomodoroStateProvider } from './context/pomodoro-state/pomodoro-state.context';
import styles from './pomodoro-timer.module.css';
import { CounterComponent } from './components/counter/counter.component';
import { ControlsComponent } from './components/controls/controls.component';
import {
  PomodoroStateIndicatorComponent,
} from './components/pomodoro-state-indicator/pomodoro-state-indicator.component';

export const PomodoroTimerComponent = () => (
  <GameStateProvider>
    <TimerStateProvider>
      <PomodoroStateProvider>
        <ControlActionsProvider>
          <div className={styles.pomodoroTimer}>
            <PomodoroStateIndicatorComponent />
            <CounterComponent />
            <ControlsComponent />
          </div>
        </ControlActionsProvider>
      </PomodoroStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
