import { SettingsStateProvider, useSettingsStateContext } from '@contexts';
import { setupMatchMediaMock } from "@mocks/match-media/match-media.mock";
import { act, renderHook } from '@testing-library/react-hooks';

const renderTestHook = () => renderHook(() => useSettingsStateContext(), { wrapper: SettingsStateProvider });

describe('On initial load', () => {
  beforeEach(() => {
    setupMatchMediaMock();
  });

  test('should render without errors when configured correctly', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestHook();

    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render with errors when no provider supplied', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useSettingsStateContext());

    expect(spyError).toHaveBeenCalled();
  });

  test('should activate dark mode if preferred', () => {
    setupMatchMediaMock({
      matches: true,
    });
    const { result: settingsHooks } = renderTestHook();

    expect(settingsHooks.current.isUseDarkMode).toBe(true);
    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');
  });

  test('should not activate dark mode if not preferred', () => {
    setupMatchMediaMock({
      matches: false,
    });
    const { result: settingsHooks } = renderTestHook();

    expect(settingsHooks.current.isUseDarkMode).toBe(false);
    expect(document.getElementsByTagName('html')[0].classList).not.toContain('dark');
  });
});

describe('When user toggles dark mode', () => {
  test('should remove dark mode if currently dark mode', () => {
    setupMatchMediaMock({
      matches: true,
    });
    const { result: darkModeHook } = renderTestHook();

    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');

    act(() => {
      darkModeHook.current.setIsUseDarkMode(false);
    });

    expect(document.getElementsByTagName('html')[0].classList).not.toContain('dark');

  });

  test('should activate dark mode if currently not dark mode', () => {
    setupMatchMediaMock({
      matches: false,
    });
    const { result: darkModeHook } = renderTestHook();

    expect(document.getElementsByTagName('html')[0].classList).not.toContain('dark');

    act(() => {
      darkModeHook.current.setIsUseDarkMode(true);
    });

    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');

  });
});
