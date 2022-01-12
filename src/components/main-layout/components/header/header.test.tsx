import { SettingsPanel } from '@components/settings-panel';
import {
  SettingsFormStateProvider, SettingsPanelStateProvider, SettingsStateProvider, 
} from '@contexts';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { setupIntersectionObserverMock } from '@mocks/setup-intersection-observer/setup-intersection-observer.mock';
import { getSwitchToggle, triggerSwitchToggle } from '@test-utils/settings';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Header } from './header.component';

const renderTestComponent = () => render(
  <SettingsPanelStateProvider>
    <SettingsStateProvider>
      <SettingsFormStateProvider>
        <SettingsPanel/>
      </SettingsFormStateProvider>
      <Header/>
    </SettingsStateProvider>
  </SettingsPanelStateProvider>,
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
});

describe('When the user see the header', () => {
  beforeEach(() => {
    setupMatchMediaMock();
    renderTestComponent();
  });

  test('should see the site title', () => {
    const { getByRole } = screen;
    const siteHeading = getByRole('heading', { name: 'Focus Time' });
    expect(siteHeading).toBeInTheDocument();
  });

  test('should see the dark mode button', () => {
    const darkModeToggle = getSwitchToggle('Use dark mode');
    expect(darkModeToggle).toBeInTheDocument();
  });

  test('should see the sound toggle button', () => {
    const useSoundToggle = getSwitchToggle('Use sound');
    expect(useSoundToggle).toBeInTheDocument();
  });

  test('should see the settings button', () => {
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
    triggerSwitchToggle(DarkModeToggle);

    expect(DarkModeToggle).toBeChecked();
    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');

    triggerSwitchToggle(DarkModeToggle);
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
    triggerSwitchToggle(useSoundToggle);

    expect(useSoundToggle).toBeChecked();

    triggerSwitchToggle(useSoundToggle);

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

  test('should open the modal', () => {
    const { getByRole } = screen;
    const settingsButton = getByRole('button', { name: 'Settings' });

    act(() => {
      fireEvent.click(settingsButton);
    });

    const modal = getByRole('dialog');

    expect(modal).toBeInTheDocument();
  });
});
