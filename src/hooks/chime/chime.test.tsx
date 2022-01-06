import { SettingsStateContextValues, SettingsStateProvider } from '@contexts';
import * as SettingsStateHookModule from '@contexts/settings-state/settings-state.hook';
import { useChime } from '@hooks';
import { act, renderHook } from '@testing-library/react-hooks';

const mockedAudioPlay = jest.fn();
const spyAudio = jest.spyOn(window, 'Audio');

const mockAudio = () => {
  spyAudio.mockImplementation(() => ({
    play: () => mockedAudioPlay(),
    paused: true,
  } as HTMLAudioElement));
};

jest.useFakeTimers();

jest.mock(
  '@contexts/settings-state/settings-state.hook',
  () => jest.requireActual('@contexts/settings-state/settings-state.hook'),
);

mockAudio();

const mockSetIsUseSound = (isUseSound = false) => {
  jest.spyOn(SettingsStateHookModule, 'useSettingsStateContext').mockImplementation(() => ({
    isUseSound,
  } as SettingsStateContextValues));
};

const renderTestHook = () => renderHook(() => useChime(), { wrapper: SettingsStateProvider });

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors when configured correctly', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestHook();

    expect(spyError).not.toHaveBeenCalled();
  });

  test('should render with errors when no provider supplied', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useChime());

    expect(spyError).toHaveBeenCalled();
  });
});

describe('When sound settings is active', () => {
  beforeEach(() => {
    mockSetIsUseSound(true);
  });

  test('should play when triggered', () => {
    const { result } = renderTestHook();

    act(() => {
      result.current.playChime();
    });

    expect(mockedAudioPlay).toHaveBeenCalled();
  });

  test('should not play when sound is already playing', () => {
    const { result } = renderTestHook();

    act(() => {
      result.current.playChime();
    });

    act(() => {
      result.current.playChime();
    });

    expect(mockedAudioPlay).toHaveBeenCalledTimes(1);
  });
});

describe('When sound settings is disabled', () => {
  beforeEach(() => {
    mockSetIsUseSound();
  });
  test('should not trigger sounds', () => {
    const { result } = renderTestHook();

    act(() => {
      result.current.playChime();
    });

    expect(mockedAudioPlay).not.toHaveBeenCalled();
  });
});