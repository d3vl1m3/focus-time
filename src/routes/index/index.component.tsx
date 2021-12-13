import {VoidFunctionComponent} from 'react';
import {PomodoroTimer, SettingsPanel} from '../../components';
import {
  ControlActionsProvider,
  GameStateProvider,
  TimerStateProvider,
  PomodoroStateProvider,
} from '../../components/pomodoro-timer/contexts';

import {SettingsFormValuesProvider} from '../../components/settings-panel/contexts';

export const Index: VoidFunctionComponent = () => (
  <GameStateProvider>
    <TimerStateProvider>
      <PomodoroStateProvider>
        <ControlActionsProvider>
          <SettingsFormValuesProvider>
            <SettingsPanel/>
          </SettingsFormValuesProvider>
          <PomodoroTimer/>
        </ControlActionsProvider>
      </PomodoroStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
