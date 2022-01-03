import { useGameStateContext } from '@contexts';
import { PomodoroStateType } from '@types';
import { VoidFunctionComponent } from 'react';

import styles from './pomodoro-state-indicator.module.css';

type PomodoroStateIndicatorPresenterProps = {
  pomodoroState: PomodoroStateType
};

type PomodoroStateIndicatorType = VoidFunctionComponent<PomodoroStateIndicatorPresenterProps>

export const PomodoroStateIndicatorPresenter: PomodoroStateIndicatorType = ({
  pomodoroState,
}) => {
  const { isUseLongBreaks } = useGameStateContext();

  const stateIndicatorClasses = (state: PomodoroStateType) =>
    `${styles.indicator} ${pomodoroState === state ? styles.indicatorActive : ''}`;

  return (
    <ul className={styles.indicators}>
      <li
        className={stateIndicatorClasses('FOCUS')}
      >
        <span role={pomodoroState === 'FOCUS' ? 'status' : ''}>Focus</span>
      </li>
      <li
        className={stateIndicatorClasses('SHORT_BREAK')}
      >
        <span role={pomodoroState === 'SHORT_BREAK' ? 'status' : ''}>Short break</span>
      </li>
      {
        isUseLongBreaks && (
          <li
            className={stateIndicatorClasses('LONG_BREAK')}
          >
            <span role={pomodoroState === 'LONG_BREAK' ? 'status' : ''}>Long break</span>
          </li>
        )
      }
    </ul>
  );
};
