import { Index } from '@components/pages';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { testPageTitle } from '@test-utils/pomodoro-timer';
import {
  render,
  screen,
  within,
} from '@testing-library/react';

const renderTestComponent = () => render(
  <Index />,
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

  test('should see the site header', () => {
    testPageTitle('Focus Time');
  });

  test('should see the settings button', () => {
    const { getByRole } = screen;
    const settingsButton = getByRole('button', { name: 'Settings' });

    expect(within(settingsButton).getByText('Settings')).toBeInTheDocument();
  });

  test('should see the footer text', () => {
    const { queryByText } = screen;
    expect(queryByText('A D3VL1M3 project')).toBeInTheDocument();
  });
});