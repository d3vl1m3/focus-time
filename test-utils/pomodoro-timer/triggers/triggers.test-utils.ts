import {
  act,
  fireEvent,
  screen,
} from "@testing-library/react";

export type ValidControlName =
  'Start a Pomodoro session' |
  'Pause timer' |
  'Skip interval' |
  'Reset Pomodoro session' |
  'Resume timer' |
  'Reset to a new Pomodoro session';

export const triggerControl = (name: ValidControlName) => {
  const { getByRole } = screen;
  const control = getByRole('button', { name });

  // Reset the timer
  act(() => {
    fireEvent.click(control);
  });
};