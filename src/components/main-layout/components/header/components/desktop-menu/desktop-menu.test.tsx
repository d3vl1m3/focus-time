import { SettingsPanel } from '@components/settings-panel';
import {
  SettingsFormStateProvider, SettingsPanelStateProvider, SettingsStateProvider, 
} from '@contexts';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { setupIntersectionObserverMock } from '@mocks/setup-intersection-observer/setup-intersection-observer.mock';
import { getButtonByName, triggerClick } from '@test-utils/jest';
import { getSwitchToggle } from '@test-utils/settings';
import {
  act,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import * as nextAuthClient from 'next-auth/client';

import { DesktopMenu } from './desktop-menu.component';

jest.mock('next-auth/client');
jest.spyOn(nextAuthClient, 'useSession').mockReturnValue([{}, false]);
jest.spyOn(nextAuthClient, 'signIn').mockReturnValue(() => null);

const renderTestComponent = () => render(
  <SettingsStateProvider>
    <SettingsPanelStateProvider>
      <DesktopMenu/>
      <SettingsFormStateProvider>
        <SettingsPanel />
      </SettingsFormStateProvider>
    </SettingsPanelStateProvider>
  </SettingsStateProvider>,
);

beforeEach(() => {
  setupIntersectionObserverMock();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    setupMatchMediaMock();
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should see the dark mode button', () => {
    renderTestComponent();
    const darkModeToggle = getSwitchToggle('Use dark mode');
    expect(darkModeToggle).toBeInTheDocument();
  });

  test('should see the sound toggle button', () => {
    renderTestComponent();
    const useSoundToggle = getSwitchToggle('Use sound');
    expect(useSoundToggle).toBeInTheDocument();
  });

  test('should see the settings button', () => {
    renderTestComponent();
    const { getByRole } = screen;
    const settingsButton = getByRole('button', { name: 'Settings' });

    expect(settingsButton).toBeInTheDocument();
  });
});

describe('When the users presses the dark mode toggle', () => {
  beforeEach(() => {
    setupMatchMediaMock();
    renderTestComponent();
  });
  test('should toggle the dark mode state', () => {
    const DarkModeToggle = getSwitchToggle('Use dark mode');
    triggerClick(DarkModeToggle);

    expect(DarkModeToggle).toBeChecked();
    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');

    triggerClick(DarkModeToggle);
    expect(DarkModeToggle).not.toBeChecked();

    expect(document.getElementsByTagName('html')[0].classList).not.toContain('dark');
  });
});

describe('When the users presses the sound toggle', () => {
  beforeEach(() => {
    setupMatchMediaMock();
    renderTestComponent();
  });
  test('should toggle the sound state', () => {
    const useSoundToggle = getSwitchToggle('Use sound');
    triggerClick(useSoundToggle);

    expect(useSoundToggle).toBeChecked();

    triggerClick(useSoundToggle);

    expect(useSoundToggle).not.toBeChecked();
  });
});

describe('When the users presses the settings button', () => {
  beforeEach(() => {
    setupMatchMediaMock();
    renderTestComponent();

    const { queryByRole } = screen;
    const modal = queryByRole('dialog');

    expect(modal).not.toBeInTheDocument();
  });

  test('should open the settings modal', () => {
    const { getByRole } = screen;
    const settingsButton = getButtonByName('Settings' );

    act(() => {
      fireEvent.click(settingsButton);
    });

    const modal = getByRole('dialog');

    expect(modal).toBeInTheDocument();
  });
});
