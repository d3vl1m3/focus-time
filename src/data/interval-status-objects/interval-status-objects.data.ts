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
    description: 'Phew! Good work. Let\'s take a break',
  },
  LONG_BREAK: {
    slug: 'LONG_BREAK',
    label: 'Long break',
    description: 'You\'ve earned this. Have some "you" time and take a longer break.',
  },
  RESET: {
    slug: 'RESET',
    label: 'Reset',
    description: 'Press ‘start’ to begin a new timer',
  },
  COMPLETED: {
    slug: 'COMPLETED',
    label: 'Completed',
    description: 'Well done! You\'ve reached your goal!',
  },
};
