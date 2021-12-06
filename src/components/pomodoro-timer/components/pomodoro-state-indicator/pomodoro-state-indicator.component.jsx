import React from 'react';
import { usePomodoroStateContext } from '../../context/pomodoro-state/pomodoro-state.context';
import { PomodoroStateIndicatorPresenter } from './pomodoro-state-indicator.presenter';

export const PomodoroStateIndicatorComponent = () => {
  const { pomodoroState } = usePomodoroStateContext();

  return (<PomodoroStateIndicatorPresenter pomodoroState={pomodoroState} />);
};
