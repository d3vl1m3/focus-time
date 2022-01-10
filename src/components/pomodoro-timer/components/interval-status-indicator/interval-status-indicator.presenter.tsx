import { intervalStatusObjects } from '@data';
import { IntervalStatusSlugType } from '@types';
import React, { VoidFunctionComponent } from 'react';

import styles from './interval-status-indicator.module.css';

type PomodoroStateIndicatorPresenterProps = {
  intervalStatusSlug?: IntervalStatusSlugType
};

type PomodoroStateIndicatorType = VoidFunctionComponent<PomodoroStateIndicatorPresenterProps>

export const IntervalStatusIndicatorPresenter: PomodoroStateIndicatorType = ({
  intervalStatusSlug = intervalStatusObjects['INITIAL'].slug,
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
