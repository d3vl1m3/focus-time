import { SettingsStateContextValues, SettingsStateProvider } from '@contexts';
import * as SettingsStateContextModule from '@contexts/settings-state/settings-state.context';
import { useChime } from '@hooks';
import { setupMatchMediaMock } from "@mocks/match-media/match-media.mock";
import { triggerChime } from '@test-utils/chime';
import { triggerMockTimeSkip } from '@test-utils/jest';
import { renderHook } from '@testing-library/react-hooks';

const mockedAudioPlay = jest.fn();
const mockedAudioPause = jest.fn();
const spyAudio = jest.spyOn(window, 'Audio');

const mockAudio = (props?: Partial<HTMLAudioElement>) => spyAudio.mockImplementation(
  () => ({ play: () => mockedAudioPlay(), ...props } as HTMLAudioElement),
);

jest.useFakeTimers();

jest.mock(
  '@contexts/settings-state/settings-state.context',
  () => jest.requireActual('@contexts/settings-state/settings-state.context'),
);

const mockSetIsUseSound = (isUseSound = false) => {
  jest.spyOn(SettingsStateContextModule, 'useSettingsStateContext').mockImplementation(() => ({
    isUseSound,
  } as SettingsStateContextValues));
};

const renderTestHook = () => renderHook(() => useChime(), { wrapper: SettingsStateProvider });

beforeEach(() => {
  setupMatchMediaMock();
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe('On initial load', () => {
  test('should render with errors when no provider supplied', () => {
    const spyError = jest.spyOn(console, 'error');
    renderHook(() => useChime());

    expect(spyError).toHaveBeenCalled();
  });

  test('should render without errors when configured correctly', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestHook();

    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('When sound settings is active', () => {
  beforeEach(() => {
    mockSetIsUseSound(true);
    mockAudio();
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

describe('When sound is playing', () => {
  beforeEach(() => {
    mockSetIsUseSound(true);
    mockAudio({ currentTime: 100, pause: () => mockedAudioPause() });
  });
  test('should reset after 1 second and play sound from beginning', () => {
    const { result } = renderTestHook();
    triggerChime(result);

    // pause only triggers to reset the chime current time to 0
    expect(mockedAudioPause).toHaveBeenCalledTimes(1);
    expect(mockedAudioPlay).toHaveBeenCalledTimes(1);

    triggerMockTimeSkip(1000);

    triggerChime(result);

    expect(mockedAudioPause).toHaveBeenCalledTimes(1);
    expect(mockedAudioPlay).toHaveBeenCalledTimes(2);
  });
});
describe('When no audio is mocked', () => {
  beforeEach(() => {
    mockSetIsUseSound(true);
  });
  test('should not try to play sound', () => {
    const { result } = renderTestHook();
    triggerChime(result);

    triggerChime(result);
    triggerMockTimeSkip(1000);

    expect(mockedAudioPlay).not.toHaveBeenCalled();

  });
});
