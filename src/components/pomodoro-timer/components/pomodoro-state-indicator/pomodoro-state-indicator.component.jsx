import React from 'react';
import { usePomodoroStateContext } from '../../contexts';
import { PomodoroStateIndicatorPresenter } from './pomodoro-state-indicator.presenter';

export const PomodoroStateIndicator = () => {
  const { pomodoroState } = usePomodoroStateContext();

  return (<PomodoroStateIndicatorPresenter pomodoroState={pomodoroState} />);
};
