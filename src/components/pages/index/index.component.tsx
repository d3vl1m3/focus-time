import {
  GameStateProvider,
  PomodoroStateProvider,
  SettingsPanelStateProvider,
  TimerStateProvider,
} from '@contexts';
import { SettingsFormStateProvider, SettingsStateProvider } from '@contexts';
import { VoidFunctionComponent } from 'react';

import {
  MainLayout,
  PomodoroTimer,
  SettingsPanel,
} from '../../index';

export const Index: VoidFunctionComponent = () => (
  <GameStateProvider>
    <TimerStateProvider>
      <SettingsStateProvider>
        <PomodoroStateProvider>
          <SettingsPanelStateProvider>
            <MainLayout>
              <PomodoroTimer/>
            </MainLayout>
            <SettingsFormStateProvider>
              <SettingsPanel/>
            </SettingsFormStateProvider>
          </SettingsPanelStateProvider>
        </PomodoroStateProvider>
      </SettingsStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
