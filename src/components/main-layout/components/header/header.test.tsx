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
    <Header/>
    <SettingsStateProvider>
      <SettingsFormStateProvider>
        <SettingsPanel/>
      </SettingsFormStateProvider>
    </SettingsStateProvider>
  </SettingsPanelStateProvider>,
);

beforeEach(() => {
  setupIntersectionObserverMock();
  setupMatchMediaMock();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('When the user see the header', () => {
  beforeEach(() => {
    renderTestComponent();
  });

  test('should see the site title', () => {
    const { getByRole } = screen;
    const siteHeading = getByRole('heading', { name: 'Focus Time' });
    expect(siteHeading).toBeInTheDocument();
  });

  test('should see the dark mode button', () => {
    const darkModeToggle = getSwitchToggle('Dark mode');
    expect(darkModeToggle).toBeInTheDocument();
  });

  test('should see the settings button', () => {
    const { getByRole } = screen;
    const settingsButton = getByRole('button', { name: 'Settings' });

    expect(settingsButton).toBeInTheDocument();
  });
});

describe('When the users presses the dark mode button', () => {
  beforeEach(() => {
    renderTestComponent();
  });
  test('should toggle the dark mode state', () => {
    const DarkModeToggle = getSwitchToggle('Dark mode');
    triggerSwitchToggle(DarkModeToggle);

    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');

    triggerSwitchToggle(DarkModeToggle);

    expect(document.getElementsByTagName('html')[0].classList).not.toContain('dark');
  });
});

describe('When the users presses the settings button', () => {
  beforeEach(() => {
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
