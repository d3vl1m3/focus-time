/**
 * EXAMPLE FILE. COPY AND PASTE IN TO OTHER FILES THEN MODIFY AS REQUIRED.
 * DO NOT REMOVE FROM PROJECT OR INCLUDE IN PRODUCTION BUILD
 */
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDarkMode } from './dark-mode.hook';

const renderTestHook = () => renderHook(() => useDarkMode());

afterEach(() => {
  jest.clearAllMocks();
});

describe('Initial load error checks', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    setupMatchMediaMock();
    renderTestHook();
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('On initial load', () => {
  test('should activate dark mode if preferred', () => {
    setupMatchMediaMock({
      matches: true,
    });
    const { result: darkModeHook } = renderTestHook();

    expect(darkModeHook.current.isDarkMode).toBe(true);
    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');
  });

  test('should not activate dark mode if not preferred', () => {
    setupMatchMediaMock({
      matches: false,
    });
    const { result: darkModeHook } = renderTestHook();

    expect(darkModeHook.current.isDarkMode).toBe(false);
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
      darkModeHook.current.setIsDarkMode(false);
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
      darkModeHook.current.setIsDarkMode(true);
    });

    expect(document.getElementsByTagName('html')[0].classList).toContain('dark');

  });
});
