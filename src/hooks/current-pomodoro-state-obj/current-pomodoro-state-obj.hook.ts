import { useIntervalStatusContext } from '@contexts';
import { intervalStatusObjects } from '@data';
import { PomodoroStateObjectType } from '@types';

export const useCurrentPomodoroStateObj = (): PomodoroStateObjectType => {
  const { intervalStatus } = useIntervalStatusContext();

  return intervalStatusObjects[intervalStatus];
};
