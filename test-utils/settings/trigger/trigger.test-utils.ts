import { triggerSkipIntervalControl, triggerStartTimerControl } from '@test-utils/pomodoro-timer';
import {
  act,
  fireEvent,
  screen,
} from '@testing-library/react';

export const triggerOpenSettingsPanel = () => {
  const { getByRole } = screen;
  
  const settingsButton = getByRole('button', { name: 'Settings' });

  act(() => {
    fireEvent.click(settingsButton);
  })
}

export const triggerCompletedState = () => {
  const { getByRole } = screen;

  triggerStartTimerControl();
  triggerSkipIntervalControl();
  triggerOpenSettingsPanel();

  const focusIntervalsTargetButton = getByRole('switch', { name: 'Use a focus intervals target' });
  const focusIntervalsTargetInput = getByRole('spinbutton', { name: 'Focus interval target intervals' });
  const saveButton = getByRole('button', { name: 'Save' });

  // activate interval target
  act(() => {
    fireEvent.click(focusIntervalsTargetButton);
  });

  act(() => {
    fireEvent.input(focusIntervalsTargetInput, { target: { value: 1 } });
  });

  expect(focusIntervalsTargetButton).toBeChecked();
  expect(focusIntervalsTargetInput).toHaveValue(1);

  act(() => {
    fireEvent.click(saveButton);
  });
}