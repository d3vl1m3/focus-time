import {
  GameStateProvider,
  TimerStateProvider,
  SettingsStateProvider, IntervalStatusProvider,
} from '@contexts';
import { useCurrentPomodoroStateObj } from '@hooks';
import { setupMatchMediaMock } from "@mocks/match-media/match-media.mock";
import { renderHook } from '@testing-library/react-hooks';

beforeEach(() => {
  setupMatchMediaMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors when configured correctly', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useCurrentPomodoroStateObj(),{ wrapper: ({ children }) => (
      <TimerStateProvider>
        <GameStateProvider>
          <SettingsStateProvider>
            <IntervalStatusProvider>
              {children}
            </IntervalStatusProvider>
          </SettingsStateProvider>
        </GameStateProvider>
      </TimerStateProvider>
    ) });

    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render with errors when no provider supplied', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useCurrentPomodoroStateObj());

    expect(spyError).toHaveBeenCalled();
  });
});
