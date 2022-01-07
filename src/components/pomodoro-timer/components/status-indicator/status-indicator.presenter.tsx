import { intervalStatusObjects } from '@data';
import { IntervalStatusSlugType } from '@types';
import React, { VoidFunctionComponent } from 'react';

import styles from './status-indicator.module.css';

type PomodoroStateIndicatorPresenterProps = {
  intervalStatusSlug?: IntervalStatusSlugType
};

type PomodoroStateIndicatorType = VoidFunctionComponent<PomodoroStateIndicatorPresenterProps>

export const StatusIndicatorPresenter: PomodoroStateIndicatorType = ({
  intervalStatusSlug = intervalStatusObjects['RESET'].slug,
}) => {

  return (
    <p
      className={styles.indicator}
      role="status"
    >
      {intervalStatusObjects[intervalStatusSlug].description}
    </p>
  );
};
