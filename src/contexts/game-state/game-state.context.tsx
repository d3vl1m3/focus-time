import { SetStateType } from '@types';
import {
  createContext,
  FunctionComponent,
  useContext,
  useMemo,
  useState,
} from 'react';

export type GameStateContextValues = {
  isCompleted: boolean,
  setIsCompleted: SetStateType<boolean>,
  isFirstInterval: boolean,
  setIsFirstInterval: SetStateType<boolean>,
  focusIntervalsCompleted: number,
  setFocusIntervalsCompleted: SetStateType<number>,
};

const GameStateContext = createContext<GameStateContextValues | undefined>(undefined);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameStateContext must be inside a GameStateProvider');
  }

  return context;
};

export const GameStateProvider: FunctionComponent = ({ children }) => {
  const [focusIntervalsCompleted, setFocusIntervalsCompleted] = useState(0);
  const [isFirstInterval, setIsFirstInterval] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  const values = useMemo(() => ({
    focusIntervalsCompleted,
    setFocusIntervalsCompleted,
    isCompleted,
    setIsCompleted,
    isFirstInterval,
    setIsFirstInterval,
  }), [
    focusIntervalsCompleted,
    isCompleted,
    isFirstInterval,
  ]);

  return (
    <GameStateContext.Provider value={values}>
      {children}
    </GameStateContext.Provider>
  );
};
