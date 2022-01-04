import { PomodoroStateType } from '@types';
import React, { VoidFunctionComponent } from 'react';

import styles from './pomodoro-state-indicator.module.css';

type PomodoroStateIndicatorPresenterProps = {
  pomodoroState?: PomodoroStateType,
  isUseLongBreaks?: boolean
};

type PomodoroStateIndicatorType = VoidFunctionComponent<PomodoroStateIndicatorPresenterProps>

export const PomodoroStateIndicatorPresenter: PomodoroStateIndicatorType = ({
  isUseLongBreaks = false,
  pomodoroState = '',
}) => {
  const stateIndicatorClasses = (state: PomodoroStateType) =>
    `${styles.indicator} ${pomodoroState === state ? styles.indicatorActive : ''}`;
  const indicatorRole = (state: PomodoroStateType) => pomodoroState === state ? 'status' : '';

  return (
    <ul className={styles.indicators} >
      <li
        className={stateIndicatorClasses('FOCUS')}
      >
        <span role={indicatorRole('FOCUS')}>Focus</span>
      </li>
      <li
        className={stateIndicatorClasses('SHORT_BREAK')}
      >
        <span role={indicatorRole('SHORT_BREAK')}>Short break</span>
      </li>
      {
        isUseLongBreaks && (
          <li 
            className={stateIndicatorClasses('LONG_BREAK')}
          >
            <span role={indicatorRole('LONG_BREAK')}>Long break</span>
          </li>
        )
      }
    </ul>
  );
};
