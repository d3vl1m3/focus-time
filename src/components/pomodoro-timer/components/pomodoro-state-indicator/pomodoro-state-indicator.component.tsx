import { usePomodoroStateContext } from '@contexts';
import { VoidFunctionComponent } from 'react';

import { PomodoroStateIndicatorPresenter } from './pomodoro-state-indicator.presenter';

export const PomodoroStateIndicator: VoidFunctionComponent = () => {
  const { pomodoroState } = usePomodoroStateContext();

  return (<PomodoroStateIndicatorPresenter pomodoroState={pomodoroState}/>);
};
