import { triggerSkipIntervalControl, triggerStartTimerControl } from '@test-utils/pomodoro-timer';
import { setInputFieldValue } from '@test-utils/settings/setters/setters.test-utils';
import {
  act,
  fireEvent,
  screen,
} from '@testing-library/react';

export const triggerCloseSettingsPanel = () => {
  const { getByRole } = screen;

  const closeModalButton = getByRole('button', { name: 'Cancel' });

  act(() => {
    fireEvent.click(closeModalButton);
  })
}

export const triggerCompletedState = () => {
  const { getByRole } = screen;

  triggerStartTimerControl();
  triggerSkipIntervalControl();
  triggerOpenSettingsPanel();

  const focusIntervalsTargetButton = getByRole('switch', { name: 'Use a focus intervals target' });
  const focusIntervalsTargetInput = getByRole('spinbutton', { name: 'Focus intervals target intervals' });

  triggerSwitchToggle(focusIntervalsTargetButton);

  setInputFieldValue(focusIntervalsTargetInput, 1);

  expect(focusIntervalsTargetButton).toBeChecked();
  expect(focusIntervalsTargetInput).toHaveValue(1);

  triggerSaveSettingsPanel();
}

export const triggerOpenSettingsPanel = () => {
  const { getByRole } = screen;

  const settingsButton = getByRole('button', { name: 'Settings' });

  act(() => {
    fireEvent.click(settingsButton);
  })
}

export const triggerSaveSettingsPanel = () => {
  const { getByRole } = screen;

  const saveSettingsButton = getByRole('button', { name: 'Save' });

  act(() => {
    fireEvent.click(saveSettingsButton);
  })
}

export const triggerSwitchToggle = (element: HTMLElement) => {
  act(() => {
    fireEvent.click(element);
  })
};
