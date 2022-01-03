import { SetStateType } from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type TimerStateContextValues = {
  timeInMs: number,
  setTimeInMs: SetStateType<number>,

  isActive: boolean,
  setIsActive: SetStateType<boolean>,

  isPaused: boolean,
  setIsPaused: SetStateType<boolean>,

  isSkipping: boolean,
  setIsSkipping: SetStateType<boolean>,

};

const TimerStateContext = createContext<TimerStateContextValues | undefined>(undefined);

export const useTimerStateContext = () => {
  const context = useContext(TimerStateContext);
  if (context === undefined) {
    throw new Error('useTimerStateContext must be inside a TimerStateProvider');
  }

  return context;
};

const intervalLength = 500;

export const TimerStateProvider: FunctionComponent = ({
  children,
}) => {
  const [isPaused, setIsPaused] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [timeInMs, setTimeInMs] = useState(0);

  useEffect(() => {
    let interval = 0;

    if (isActive && !isPaused && !isSkipping) {

      // needs to be set as `unknown` to `number` as clearInterval doesn't accept a `NodeJS.Timer` as a param
      // even though they both actually just return numbers
      interval = setInterval(() => {
        setTimeInMs((ms) => ms - intervalLength);
      }, intervalLength) as unknown as number;
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused, isSkipping]);

  const values = useMemo(() => ({
    isActive,
    setIsActive,

    isPaused,
    setIsPaused,

    isSkipping,
    setIsSkipping,

    timeInMs,
    setTimeInMs,
  }), [
    isActive,
    isPaused,
    isSkipping,
    timeInMs,
  ]);

  return (
    <TimerStateContext.Provider value={values}>
      {children}
    </TimerStateContext.Provider>
  );
};