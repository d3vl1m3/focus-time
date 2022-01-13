import { triggerClick } from '@test-utils/jest';
import { triggerControl } from '@test-utils/pomodoro-timer';
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
  });
};

export const triggerCompletedState = () => {
  const { getByRole } = screen;

  triggerControl('Start a Pomodoro session');
  triggerControl('Skip interval');
  triggerOpenSettingsPanel();

  const focusIntervalsTargetButton = getByRole('switch', { name: 'Use a focus intervals target' });
  const focusIntervalsTargetInput = getByRole('spinbutton', { name: 'Focus intervals target' });

  triggerClick(focusIntervalsTargetButton);

  setInputFieldValue(focusIntervalsTargetInput, 1);

  expect(focusIntervalsTargetButton).toBeChecked();
  expect(focusIntervalsTargetInput).toHaveValue(1);

  triggerSaveSettingsPanel();
};

export const triggerOpenSettingsPanel = () => {
  const { getByRole } = screen;

  const settingsButton = getByRole('button', { name: 'Settings' });

  act(() => {
    fireEvent.click(settingsButton);
  });
};

export const triggerSaveSettingsPanel = () => {
  const { getByRole } = screen;

  const saveSettingsButton = getByRole('button', { name: 'Save' });

  act(() => {
    fireEvent.click(saveSettingsButton);
  });
};
