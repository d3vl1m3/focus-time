import {
  PomodoroStateObjectType,
  PomodoroStateType, 
} from '@types';

export const pomodoroStateObjectsData: Record<PomodoroStateType, PomodoroStateObjectType> = {
  FOCUS: {
    state: 'FOCUS',
    label: 'Focus',
  },
  SHORT_BREAK: {
    state: 'SHORT_BREAK',
    label: 'Short break',
  },
  LONG_BREAK: {
    state: 'LONG_BREAK',
    label: 'Long break',
  },
  RESET: {
    state: 'RESET',
    label: 'Reset',
  },
  COMPLETED: {
    state: 'COMPLETED',
    label: 'Completed',
  },
};
