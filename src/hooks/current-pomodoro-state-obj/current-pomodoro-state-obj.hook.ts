import { usePomodoroStateContext } from '@contexts';
import { pomodoroStateObjectsData } from '@data';
import { PomodoroStateObjectType } from '@types';

export const useCurrentPomodoroStateObj = (): PomodoroStateObjectType => {
  const { pomodoroState } = usePomodoroStateContext();

  return pomodoroStateObjectsData[pomodoroState];
};
