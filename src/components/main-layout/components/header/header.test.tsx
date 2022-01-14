import { SettingsPanelStateProvider, SettingsStateProvider } from "@contexts";
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { setupIntersectionObserverMock } from '@mocks/setup-intersection-observer/setup-intersection-observer.mock';
import { triggerClick } from '@test-utils/jest';
import {
  render,
  screen,
} from '@testing-library/react';

import { Header } from './header.component';

const renderTestComponent = () => render(
  <SettingsPanelStateProvider>
    <SettingsStateProvider>
      <Header/>
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

describe('When the user sees the header', () => {
  beforeEach(() => {
    renderTestComponent();
  });

  test('should see the site title', () => {
    const { getByRole } = screen;
    const siteHeading = getByRole('heading', { name: 'Focus Time' });
    expect(siteHeading).toBeInTheDocument();
  });

  test('should render mobile menu toggle button', () => {
    const { getByRole } = screen;
    const mobileButton = getByRole('button', { name: 'Quick settings' });

    expect(mobileButton).toBeInTheDocument();
  });

  test('should render two settings buttons', () => {
    const { getAllByRole } = screen;
    const settingsButton = getAllByRole('button', { name: 'Settings' });

    // one for desktop, one for mobile
    expect(settingsButton.length).toBe(2);
  });
});

describe('When the users presses the mobile panel button', () => {
  beforeEach(() => {
    renderTestComponent();
  });

  test('should trigger function to display actions', () => {
    const { getByRole } = screen;
    const mobileButton = getByRole('button', { name: 'Quick settings' } );

    expect(mobileButton).toHaveAttribute('aria-expanded', "false");

    triggerClick(mobileButton);

    expect(mobileButton).toHaveAttribute('aria-expanded', "true");
  });
});
