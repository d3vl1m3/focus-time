import { useIntervalStatusContext } from '@contexts';
import { VoidFunctionComponent } from 'react';

import { IntervalStatusIndicatorPresenter } from './interval-status-indicator.presenter';

export const IntervalStatusIndicator: VoidFunctionComponent = () => {
  const { intervalStatus } = useIntervalStatusContext();

  return (<IntervalStatusIndicatorPresenter intervalStatusSlug={intervalStatus} />);
};
