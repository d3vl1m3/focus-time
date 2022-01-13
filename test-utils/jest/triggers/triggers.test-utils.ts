import { act, fireEvent } from '@testing-library/react';

type TriggerMockTimeSkipMs = {ms: number};
type TriggerMockTimeSkipSeconds = {seconds: number};
type TriggerMockTimeSkipMinutes = {minutes: number};
type TriggerMockTimeSkipProps = TriggerMockTimeSkipMs | TriggerMockTimeSkipSeconds | TriggerMockTimeSkipMinutes;

export function triggerMockTimeSkip(toSkip: TriggerMockTimeSkipProps): void;
export function triggerMockTimeSkip(ms: number): void;

export function triggerMockTimeSkip(arg: TriggerMockTimeSkipProps | number) {
  let ms = 0;

  if ( typeof arg === 'number') {
    ms = arg;
  } else {
    const [key, value] = Object.entries(arg)[0];

    switch(key) {
      case ('ms') :
        ms = value;
        break;
      case ('seconds') :
        ms = value * 1000;
        break;
      case ('minutes') :
        ms = value * 1000 * 60;
        break;
    }

  }

  act(() => {
    jest.advanceTimersByTime(ms);
  });
};

export const triggerClick = (element: HTMLElement) => {
  act(() => {
    fireEvent.click(element);
  });
};
