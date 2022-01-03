import { Index } from '@components/pages';
import { setupIntersectionObserverMock } from '@mocks/setup-intersection-observer/setup-intersection-observer.mock';
import {
  getNumberField, getSwitchToggle, testValidInputValueSaves,
  testSettingsPanelIsClosed, testSwitchSettingSaves, triggerSaveSettingsPanel, testInvalidInputValueDoesNotSave,
} from '@test-utils/settings';
import { triggerOpenSettingsPanel } from '@test-utils/settings/triggers/triggers.test-utils';
import { render } from '@testing-library/react';

const renderTestComponent = () => render(<Index />);

beforeEach(() => {
  setupIntersectionObserverMock();
})

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
    const focusDurationInput = getNumberField('Focus duration minutes');
    testValidInputValueSaves(focusDurationInput, '25', 30, '30');
  });

  test('should save shortBreakDuration value', () => {
    const shortBreakDurationInput = getNumberField('Short break duration minutes');
    testValidInputValueSaves(shortBreakDurationInput, '5', 12, '12');
  });

  test('should save longBreakDuration value', () => {
    const longBreakDurationInput = getNumberField('Long break duration minutes');
    testValidInputValueSaves(longBreakDurationInput, '10', 15, '15');
  });

  test('should save longBreakGap value', () => {
    const longBreakGapInput = getNumberField('Gap between long breaks focus intervals');
    testValidInputValueSaves(longBreakGapInput, '4', 2, '2');
  });

  test('should save focusIntervalsTarget value', () => {
    const focusIntervalsTargetInput = getNumberField('Focus intervals target intervals');
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
    testInvalidInputValueDoesNotSave('Focus duration minutes', '25', 0, '25');
  });

  test('should not save shortBreakDuration value', () => {
    testInvalidInputValueDoesNotSave('Short break duration minutes', '5', 1000, '5');
  });

  test('should not save longBreakDuration value', () => {
    testInvalidInputValueDoesNotSave('Long break duration minutes', '10', -1, '10');
  });

  test('should not save longBreakGap value', () => {
    testInvalidInputValueDoesNotSave('Gap between long breaks focus intervals', '4', 1001, '4');
  });

  test('should not save focusIntervalsTarget value', () => {
    testInvalidInputValueDoesNotSave('Focus intervals target intervals', '8', -1000, '8');
  });
});
