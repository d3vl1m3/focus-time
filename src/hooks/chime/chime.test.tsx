import { SettingsStateContextValues, SettingsStateProvider } from '@contexts';
import * as SettingsStateHookModule from '@contexts/settings-state/settings-state.hook';
import { useChime } from '@hooks';
import { triggerChime } from '@test-utils/chime';
import { triggerMockTimeSkip } from '@test-utils/jest';
import { renderHook } from '@testing-library/react-hooks';

const mockedAudioPlay = jest.fn();
const spyAudio = jest.spyOn(window, 'Audio');

const mockAudio = () => {
  spyAudio.mockImplementation(() => ({
    play: () => mockedAudioPlay(),
  } as HTMLAudioElement));
};

jest.useFakeTimers();

jest.mock(
  '@contexts/settings-state/settings-state.hook',
  () => jest.requireActual('@contexts/settings-state/settings-state.hook'),
);

const mockSetIsUseSound = (isUseSound = false) => {
  jest.spyOn(SettingsStateHookModule, 'useSettingsStateContext').mockImplementation(() => ({
    isUseSound,
  } as SettingsStateContextValues));
};

const renderTestHook = () => renderHook(() => useChime(), { wrapper: SettingsStateProvider });

beforeAll(() => {
  mockAudio();
});

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

  test('should play a chime when triggered', () => {
    const { result } = renderTestHook();
    triggerChime(result);

    expect(mockedAudioPlay).toHaveBeenCalled();
  });

  test('should not play when chime is already playing', () => {
    const { result } = renderTestHook();
    triggerChime(result);
    triggerChime(result);

    expect(mockedAudioPlay).toHaveBeenCalledTimes(1);
  });

  test('should allow the app to play another chime after 1 second', () => {
    const { result } = renderTestHook();
    triggerChime(result);
    triggerChime(result);

    expect(mockedAudioPlay).toHaveBeenCalledTimes(1);

    triggerMockTimeSkip(999);
    triggerChime(result);

    expect(mockedAudioPlay).toHaveBeenCalledTimes(1);

    triggerMockTimeSkip(1);
    triggerChime(result);
    triggerChime(result);

    expect(mockedAudioPlay).toHaveBeenCalledTimes(2);
  });
});

describe('When sound settings is disabled', () => {
  beforeEach(() => {
    mockSetIsUseSound();
  });
  test('should not trigger a chime', () => {
    const { result } = renderTestHook();
    triggerChime(result);

    expect(mockedAudioPlay).not.toHaveBeenCalled();
  });
});