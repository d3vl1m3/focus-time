import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const GameStateContext = createContext(undefined);

export const useGameStateContext = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameStateContext must be inside a GameStateProvider');
  }

  return context;
};

export const GameStateProvider = ({ children }) => {
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const values = useMemo(() => ({
    isCompleted,
    longBreakGoal: 4,
    longBreakLength: 3 * 1000 * 60,
    pomodoroLength: 2 * 1000 * 60,
    pomodorosCompleted,
    setIsCompleted,
    setPomodorosCompleted,
    shortBreakLength: 4 * 1000 * 60,
    // isUseLongBreaks
    // isUseTargetPomodoros
    targetPomodoros: 3,
  }), [isCompleted, pomodorosCompleted, setIsCompleted, setPomodorosCompleted]);

  return (
    <GameStateContext.Provider value={values}>
      {children}
    </GameStateContext.Provider>
  );
};
