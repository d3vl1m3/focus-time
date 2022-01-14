import { MainLayout } from '@components/main-layout/main-layout.component';
import { SettingsPanelStateProvider, SettingsStateProvider } from '@contexts';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import {
  render,
  screen,
} from '@testing-library/react';

const renderTestComponent = () => render(
  <SettingsPanelStateProvider>
    <SettingsStateProvider>
      <MainLayout />
    </SettingsStateProvider>
  </SettingsPanelStateProvider>,
);

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('When looking at the page', () => {
  beforeEach(() => {
    setupMatchMediaMock();
    renderTestComponent();
  });

  test('should see the settings button', () => {
    const { getAllByRole } = screen;
    const settingsButton = getAllByRole('button', { name: 'Settings' });

    // one for desktop, one for mobile
    expect(settingsButton.length).toBe(2);
  });

  test('should see the footer text', () => {
    const { queryByText } = screen;
    expect(queryByText('A D3VL1M3 project')).toBeInTheDocument();
  });
});
