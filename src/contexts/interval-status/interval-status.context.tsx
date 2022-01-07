import { useSettingsStateContext } from '@contexts';
import { useChime } from '@hooks';
import {
  IntervalStatusSlugType,
  SetStateType, 
} from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useGameStateContext } from '../game-state/game-state.context';
import { useTimerStateContext } from '../timer-state/timer-state.context';

export type IntervalStatusContextValues = {
  intervalStatus: IntervalStatusSlugType,
  setIntervalStatus: SetStateType<IntervalStatusSlugType>
};

const IntervalStatusContext = createContext<IntervalStatusContextValues | undefined>(undefined);

export const useIntervalStatusContext = () => {
  const context = useContext(IntervalStatusContext);
  if (context === undefined) {
    throw new Error('useIntervalStatusContext must be inside a IntervalStatusProvider');
  }

  return context;
};

export const IntervalStatusProvider: FunctionComponent = ({ children }) => {

  const [intervalStatus, setIntervalStatus] = useState<IntervalStatusSlugType>('RESET');
  const { playChime } = useChime();
  const {
    focusIntervalsCompleted,
    setFocusIntervalsCompleted,
    isFirstInterval,
    setIsFirstInterval,
  } = useGameStateContext();

  const {
    focusDuration,
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,
    shortBreakDuration,
  } = useSettingsStateContext();

  const {
    isActive,
    isSkipping,
    setIsSkipping,
    setTimeInMinutes,
    timeInMs,
  } = useTimerStateContext();

  /**
   * Trigger intervalStatus updates based on thew current state of the app. Specifically
   * where the next intervalStatus will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
    /*
     * The below `is*()` methods are excessive but worth the trade-off as they help with readability in the
     * meat of the logic
     */
    const endOfInterval = (state: IntervalStatusSlugType) => (
      intervalStatus === state
      && (
        timeInMs <= 0
        || isSkipping
      )
    );

    const isAnyBreakFinished = () => (
      endOfInterval('SHORT_BREAK')
      || endOfInterval('LONG_BREAK')
    );

    const isWorkIntervalFinished = () => endOfInterval('FOCUS');

    const isLongBreakGoalMet = () => isUseLongBreaks && focusIntervalsCompleted % longBreakGap === (longBreakGap - 1);

    if ( isActive ) {
      // starting a new or reset timer
      if ( isFirstInterval ) {
        setIntervalStatus('FOCUS');
        setTimeInMinutes(focusDuration);
        setIsFirstInterval(false);
        playChime();
      } else {
        // Increase the counter at the end of each interval
        if (isWorkIntervalFinished()) {
          setFocusIntervalsCompleted((p) => p + 1);
        }

        // Contextually Update the IntervalStatus
        if (isAnyBreakFinished()) {
          setIntervalStatus('FOCUS');
          setTimeInMinutes(focusDuration);
          playChime();

        } else if (isWorkIntervalFinished() && !isLongBreakGoalMet()) {
          setIntervalStatus('SHORT_BREAK');
          setTimeInMinutes(shortBreakDuration);
          playChime();

        } else if (isWorkIntervalFinished() && isLongBreakGoalMet()) {
          setIntervalStatus('LONG_BREAK');
          setTimeInMinutes(longBreakDuration);
          playChime();
        }

        if (isSkipping) {
          setIsSkipping(false);
          playChime();
        }
      }
    }
  }, [
    focusDuration,
    focusIntervalsCompleted,
    isActive,
    isFirstInterval,
    isSkipping,
    isUseLongBreaks,
    longBreakDuration,
    longBreakGap,
    playChime,
    intervalStatus,
    setFocusIntervalsCompleted,
    setIsFirstInterval,
    setIsSkipping,
    setTimeInMinutes,
    shortBreakDuration,
    timeInMs,
  ]);

  const values = useMemo(() => ({
    intervalStatus,
    setIntervalStatus,
  }), [intervalStatus]);

  return (
    <IntervalStatusContext.Provider value={values}>
      {children}
    </IntervalStatusContext.Provider>
  );
};
