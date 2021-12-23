import { VoidFunctionComponent } from 'react';

import { usePomodoroStateContext } from '../../contexts';

import { PomodoroStateIndicatorPresenter } from './pomodoro-state-indicator.presenter';

export const PomodoroStateIndicator: VoidFunctionComponent = () => {
  const { pomodoroState } = usePomodoroStateContext();

  return (<PomodoroStateIndicatorPresenter pomodoroState={pomodoroState}/>);
};
