import '../styles/index.css';
import { MainLayout } from "@components/main-layout";
import { SettingsPanel } from "@components/settings-panel";
import {
  GameStateProvider,
  IntervalStatusProvider,
  SettingsFormStateProvider,
  SettingsPanelStateProvider,
  SettingsStateProvider,
  TimerStateProvider,
} from "@contexts";
import { VoidFunctionComponent } from 'react';

interface MyAppProps {
  Component: VoidFunctionComponent
}

const MyApp: VoidFunctionComponent<MyAppProps> = (
  {
    Component,
    ...props
  }) => (
  <GameStateProvider>
    <TimerStateProvider>
      <SettingsStateProvider>
        <SettingsPanelStateProvider>
          <SettingsFormStateProvider>
            <SettingsPanel/>
          </SettingsFormStateProvider>
          <MainLayout>
            <IntervalStatusProvider>
              <Component {...props} />
            </IntervalStatusProvider>
          </MainLayout>
        </SettingsPanelStateProvider>
      </SettingsStateProvider>
    </TimerStateProvider>
  </GameStateProvider>
);
export default MyApp;
