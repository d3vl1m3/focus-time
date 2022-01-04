import { usePomodoroStateContext, useSettingsStateContext } from '@contexts';
import { VoidFunctionComponent } from 'react';

import { PomodoroStateIndicatorPresenter } from './pomodoro-state-indicator.presenter';

export const PomodoroStateIndicator: VoidFunctionComponent = () => {
  const { pomodoroState } = usePomodoroStateContext();
  const { isUseLongBreaks } = useSettingsStateContext();

  return (<PomodoroStateIndicatorPresenter
    {...{ isUseLongBreaks, pomodoroState } }
  />);
};
