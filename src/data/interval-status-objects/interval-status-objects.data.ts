import {
  PomodoroStateObjectType,
  IntervalStatusSlugType,
} from '@types';

export const intervalStatusObjects: Record<IntervalStatusSlugType, PomodoroStateObjectType> = {
  FOCUS: {
    slug: 'FOCUS',
    label: 'Focus',
    description: 'Let\'s get to work! It\'s time to focus',
  },
  SHORT_BREAK: {
    slug: 'SHORT_BREAK',
    label: 'Short break',
    description: 'Phew! Good job. Let\'s take a short break',
  },
  LONG_BREAK: {
    slug: 'LONG_BREAK',
    label: 'Long break',
    description: 'Have some "you time". Take a long break.',
  },
  INITIAL: {
    slug: 'INITIAL',
    label: 'Initial',
    description: 'A Pomodoro timer to help you focus',
  },
  COMPLETED: {
    slug: 'COMPLETED',
    label: 'Completed',
    description: 'Well done! You\'ve reached your goal!',
  },
};
