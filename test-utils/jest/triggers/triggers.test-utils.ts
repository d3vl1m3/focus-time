import { act } from '@testing-library/react';

export const triggerMockTimeSkip= (ms: number) => {
  act(() => {
    jest.advanceTimersByTime(ms);
  });
}