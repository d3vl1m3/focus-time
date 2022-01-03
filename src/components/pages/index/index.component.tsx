import {
  ControlActionsProvider,
  GameStateProvider,
  PomodoroStateProvider,
  SettingsPanelProvider,
  TimerStateProvider,
} from '@contexts';
import { SettingsFormValuesProvider } from '@contexts';
import { VoidFunctionComponent } from 'react';

import {
  MainLayout,
  PomodoroTimer,
  SettingsPanel,
} from '../../index';

export const Index: VoidFunctionComponent = () => (
  <GameStateProvider>
    <TimerStateProvider>
      <PomodoroStateProvider>
        <ControlActionsProvider>
          <SettingsPanelProvider>
            <MainLayout>
              <PomodoroTimer/>
            </MainLayout>
            <SettingsFormValuesProvider>
              <SettingsPanel/>
            </SettingsFormValuesProvider>
          </SettingsPanelProvider>
        </ControlActionsProvider>
      </PomodoroStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
