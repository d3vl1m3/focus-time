import { SettingsPanel } from '@components/settings-panel/settings-panel.component';
import {
  SettingsFormStateProvider, SettingsPanelStateProvider, SettingsStateProvider, useSettingsPanelStateContext,
} from '@contexts';
import { setupMatchMediaMock } from '@mocks/match-media/match-media.mock';
import { setupIntersectionObserverMock } from '@mocks/setup-intersection-observer/setup-intersection-observer.mock';
import {
  getNumberField, getSwitchToggle, testValidInputValueSaves,
  testSettingsPanelIsClosed, testSwitchSettingSaves, triggerSaveSettingsPanel, testInvalidInputValueDoesNotSave,
} from '@test-utils/settings';
import { triggerOpenSettingsPanel } from '@test-utils/settings/triggers/triggers.test-utils';
import { render } from '@testing-library/react';

const OpenModalButton = () => {
  const { setIsSettingsOpen } = useSettingsPanelStateContext();
  return (
    <button
      type="button"
      onClick={() => setIsSettingsOpen((open) => !open)}
    >
      Settings
    </button>
  );
};

const renderTestComponent = () => render(
  <SettingsStateProvider>
    <SettingsPanelStateProvider>
      <OpenModalButton />
      <SettingsFormStateProvider>
        <SettingsPanel />
      </SettingsFormStateProvider>
    </SettingsPanelStateProvider>
  </SettingsStateProvider>,
);

beforeEach(() => {
  setupMatchMediaMock();
  setupIntersectionObserverMock();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('On initial load', () => {
  test('should render without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    testSettingsPanelIsClosed();
    expect(spyError).not.toHaveBeenCalled();
  });

  test('should open modal without errors', () => {
    const spyError = jest.spyOn(console, 'error');
    renderTestComponent();
    triggerOpenSettingsPanel();
    expect(spyError).not.toHaveBeenCalled();
  });
});

describe('On valid form submit', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerOpenSettingsPanel();
  });

  test('should close modal on valid form submission', () => {
    triggerSaveSettingsPanel();
    testSettingsPanelIsClosed();
  });
});

describe('Each form value should submit when valid', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerOpenSettingsPanel();
  });

  test('should save focusDuration value', () => {
    const focusDurationInput = getNumberField('Focus duration in minutes');
    testValidInputValueSaves(focusDurationInput, '25', 30, '30');
  });

  test('should save shortBreakDuration value', () => {
    const shortBreakDurationInput = getNumberField('Short break duration in minutes');
    testValidInputValueSaves(shortBreakDurationInput, '5', 12, '12');
  });

  test('should save longBreakDuration value', () => {
    const longBreakDurationInput = getNumberField('Long break duration in minutes');
    testValidInputValueSaves(longBreakDurationInput, '10', 15, '15');
  });

  test('should save longBreakGap value', () => {
    const longBreakGapInput = getNumberField('Focus intervals between long breaks');
    testValidInputValueSaves(longBreakGapInput, '4', 2, '2');
  });

  test('should save focusIntervalsTarget value', () => {
    const focusIntervalsTargetInput = getNumberField('Focus intervals target');
    testValidInputValueSaves(focusIntervalsTargetInput, '8', 4, '4');
  });

  test('should save isUseLongBreaks value', () => {
    const switchButton = getSwitchToggle( 'Use long breaks');
    testSwitchSettingSaves(switchButton);

  });

  test('should save isUseFocusIntervalsTarget value', () => {
    const switchButton = getSwitchToggle( 'Use a focus intervals target');
    testSwitchSettingSaves(switchButton);
  });
});

describe('Each form value should not save if value is invalid', () => {
  beforeEach(() => {
    renderTestComponent();
    triggerOpenSettingsPanel();
  });

  test('should not save focusDuration value', () => {
    testInvalidInputValueDoesNotSave('Focus duration in minutes', '25', 0, '25');
  });

  test('should not save shortBreakDuration value', () => {
    testInvalidInputValueDoesNotSave('Short break duration in minutes', '5', 1000, '5');
  });

  test('should not save longBreakDuration value', () => {
    testInvalidInputValueDoesNotSave('Long break duration in minutes', '10', -1, '10');
  });

  test('should not save longBreakGap value', () => {
    testInvalidInputValueDoesNotSave('Focus intervals between long breaks', '4', 1001, '4');
  });

  test('should not save focusIntervalsTarget value', () => {
    testInvalidInputValueDoesNotSave('Focus intervals target', '8', -1000, '8');
  });
});
