import React, {
  createContext,
  useContext,
  useMemo,
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
  const values = useMemo(() => ({
    pomodoroLength: 3 * 1000 * 60,
    shortBreakLength: 2 * 1000 * 60,
    // isUseLongBreaks
    // longBreakGoal
    // isUseTargetPomodoros
    // targetPomodoros
  }));

  return (
    <GameStateContext.Provider value={values}>
      {children}
    </GameStateContext.Provider>
  );
};
