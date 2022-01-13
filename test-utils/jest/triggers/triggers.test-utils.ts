import { act, fireEvent } from '@testing-library/react';

export const triggerMockTimeSkip= (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

export const triggerClick = (element: HTMLElement) => {
  act(() => {
    fireEvent.click(element);
  });
};
