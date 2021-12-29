import { usePomodoroStateContext } from '../../../components/pomodoro-timer/contexts';
import { PomodoroStateObjectType } from '../../../types/pomodoro-state-object/pomodoro-state-object.type';

export const useGetPomodoroStateObj = (): PomodoroStateObjectType => {
  const { pomodoroState } = usePomodoroStateContext();

  if (pomodoroState === 'FOCUS') {
    return ({
      state: pomodoroState,
      label: 'Focus',
    });
  }

  if (pomodoroState === 'SHORT_BREAK') {
    return ({
      state: pomodoroState,
      label: 'Short break',
    });
  }

  if (pomodoroState === 'LONG_BREAK') {
    return ({
      state: pomodoroState,
      label: 'Long break',
    });
  }

  if (pomodoroState === 'COMPLETED') {
    return ({
      state: pomodoroState,
      label: 'Completed',
    });
  }

  throw new Error(`Pomodoro state has an incorrect value: ${pomodoroState}`);
}
