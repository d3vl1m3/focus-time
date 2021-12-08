import React from 'react';
import { PomodoroTimer, SettingsPanel } from '../../components';
import {
  ControlActionsProvider,
  GameStateProvider,
  TimerStateProvider,
  PomodoroStateProvider,
} from '../../components/pomodoro-timer/contexts';

export const Index = () => (
  <GameStateProvider>
    <TimerStateProvider>
      <PomodoroStateProvider>
        <ControlActionsProvider>
          <SettingsPanel />
          <PomodoroTimer />
        </ControlActionsProvider>
      </PomodoroStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
