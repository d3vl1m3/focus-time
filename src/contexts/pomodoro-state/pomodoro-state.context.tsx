import { useSettingsStateContext } from '@contexts';
import { useChime } from '@hooks';
import {
  PomodoroStateType,
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

export type PomodoroStateContextValues = {
  pomodoroState: PomodoroStateType,
  setPomodoroState: SetStateType<PomodoroStateType>
};

const PomodoroStateContext = createContext<PomodoroStateContextValues | undefined>(undefined);

export const usePomodoroStateContext = () => {
  const context = useContext(PomodoroStateContext);
  if (context === undefined) {
    throw new Error('usePomodoroStateContext must be inside a PomodoroStateProvider');
  }

  return context;
};

export const PomodoroStateProvider: FunctionComponent = ({ children }) => {

  const [pomodoroState, setPomodoroState] = useState<PomodoroStateType>('RESET');
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
   * Trigger pomodoroState updates based on thew current state of the app. Specifically
   * where the next pomodoroState will resolve differently depending on what the current
   * state of the app is.
   */
  useEffect(() => {
    /*
     * The below `is*()` methods are excessive but worth the trade-off as they help with readability in the
     * meat of the logic
     */
    const endOfInterval = (state: PomodoroStateType) => (
      pomodoroState === state
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
        setPomodoroState('FOCUS');
        setTimeInMinutes(focusDuration);
        setIsFirstInterval(false);
        playChime();
      } else {
        // End of a pomodoro that isn't skipped, increase the counter and reset the timer
        if (isWorkIntervalFinished()) {
          setFocusIntervalsCompleted((p) => p + 1);
        }

        // Contextually Update the PomodoroState
        if (isAnyBreakFinished()) {
          setPomodoroState('FOCUS');
          setTimeInMinutes(focusDuration);
          playChime();

        } else if (isWorkIntervalFinished() && !isLongBreakGoalMet()) {
          setPomodoroState('SHORT_BREAK');
          setTimeInMinutes(shortBreakDuration);
          playChime();

        } else if (isWorkIntervalFinished() && isLongBreakGoalMet()) {
          setPomodoroState('LONG_BREAK');
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
    pomodoroState,
    setFocusIntervalsCompleted,
    setIsFirstInterval,
    setIsSkipping,
    setTimeInMinutes,
    shortBreakDuration,
    timeInMs,
  ]);

  const values = useMemo(() => ({
    pomodoroState,
    setPomodoroState,
  }), [pomodoroState]);

  return (
    <PomodoroStateContext.Provider value={values}>
      {children}
    </PomodoroStateContext.Provider>
  );
};
