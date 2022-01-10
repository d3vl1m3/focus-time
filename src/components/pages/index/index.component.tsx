import {
  GameStateProvider,
  IntervalStatusProvider,
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
        <IntervalStatusProvider>
          <SettingsPanelStateProvider>
            <MainLayout>
              <PomodoroTimer/>
            </MainLayout>
            <SettingsFormStateProvider>
              <SettingsPanel/>
            </SettingsFormStateProvider>
          </SettingsPanelStateProvider>
        </IntervalStatusProvider>
      </SettingsStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
