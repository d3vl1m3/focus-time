import React from 'react';
import { PomodoroTimerComponent } from '../../components/pomodoro-timer';
import { GameStateProvider } from '../../components/pomodoro-timer/context/game-state/game-state.context';
import { TimerStateProvider } from '../../components/pomodoro-timer/context/timer-state/timer-state.context';
import { PomodoroStateProvider } from '../../components/pomodoro-timer/context/pomodoro-state/pomodoro-state.context';
import {
  ControlActionsProvider,
} from '../../components/pomodoro-timer/context/control-actions/control-actions.context';

export const Index = () => (
  <GameStateProvider>
    <TimerStateProvider>
      <PomodoroStateProvider>
        <ControlActionsProvider>
          <PomodoroTimerComponent />
        </ControlActionsProvider>
      </PomodoroStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
