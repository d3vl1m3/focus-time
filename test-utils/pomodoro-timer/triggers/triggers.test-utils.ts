import {
  act,
  fireEvent,
  screen,
} from "@testing-library/react";

export const triggerPauseTimerControl = () => {
  const { getByRole } = screen;
  const resetButton = getByRole('button', { name: 'Pause' });

  // Reset the timer
  act(() => {
    fireEvent.click(resetButton);
  });
}

export const triggerStartTimerControl = () => {
  const { getByRole } = screen;
  const startButton = getByRole('button', { name: 'Start' });

  // Start the timer
  act(() => {
    fireEvent.click(startButton);
  });
}

export const triggerResumeTimerControl = () => {
  const { getByRole } = screen;
  const startButton = getByRole('button', { name: 'Resume' });

  // Start the timer
  act(() => {
    fireEvent.click(startButton);
  });
}

export const triggerSkipIntervalControl = () => {
  const { getByRole } = screen;
  const skipButton = getByRole('button', { name: 'Skip' });

  // Skip the interval
  act(() => {
    fireEvent.click(skipButton);
  });
}

export const triggerResetTimerControl = () => {
  const { getByRole } = screen;
  const resetButton = getByRole('button', { name: 'Reset' });

  // Reset the timer
  act(() => {
    fireEvent.click(resetButton);
  });
}
