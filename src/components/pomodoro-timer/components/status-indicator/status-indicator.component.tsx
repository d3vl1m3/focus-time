import { useIntervalStatusContext } from '@contexts';
import { VoidFunctionComponent } from 'react';

import { StatusIndicatorPresenter } from './status-indicator.presenter';

export const PomodoroStateIndicator: VoidFunctionComponent = () => {
  const { intervalStatus } = useIntervalStatusContext();

  return (<StatusIndicatorPresenter intervalStatusSlug={intervalStatus} />);
};
