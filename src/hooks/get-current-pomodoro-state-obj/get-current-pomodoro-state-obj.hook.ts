import { usePomodoroStateContext } from '@contexts';
import { pomodoroStateObjectsData } from '@data';
import { PomodoroStateObjectType } from '@types';

export const useGetCurrentPomodoroStateObj = (): PomodoroStateObjectType => {
  const { pomodoroState } = usePomodoroStateContext();

  if ( !pomodoroStateObjectsData[pomodoroState] ) {
    throw new Error(`Pomodoro state has an incorrect value: ${pomodoroState}`);
  }

  return pomodoroStateObjectsData[pomodoroState];
}
