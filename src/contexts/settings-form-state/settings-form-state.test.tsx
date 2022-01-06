import {
  GameStateProvider,
  SettingsFormStateProvider,
  SettingsStateProvider,
  useSettingsFormStateContext,
} from '@contexts';
import { renderHook } from '@testing-library/react-hooks';

describe('On initial load', () => {
  test('should render without errors when configured correctly', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useSettingsFormStateContext(),{ wrapper: ({ children }) => (
      <GameStateProvider>
        <SettingsStateProvider>
          <SettingsFormStateProvider>
            {children}
          </SettingsFormStateProvider>
        </SettingsStateProvider>
      </GameStateProvider>
    ) });

    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render with errors when no provider supplied', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useSettingsFormStateContext());

    expect(spyError).toHaveBeenCalled();
  });
});