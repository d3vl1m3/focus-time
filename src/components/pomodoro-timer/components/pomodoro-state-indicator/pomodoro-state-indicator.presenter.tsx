import { VoidFunctionComponent } from 'react';

import { PomodoroStateType } from '../../../../types/pomodoro-state/pomodoro-state.type';
import { useGameStateContext } from '../../contexts';

import styles from './pomodoro-state-indicator.module.css';

type PomodoroStateIndicatorPresenterProps = {
  pomodoroState: PomodoroStateType
};

type PomodoroStateIndicatorType = VoidFunctionComponent<PomodoroStateIndicatorPresenterProps>

export const PomodoroStateIndicatorPresenter: PomodoroStateIndicatorType = ({
  pomodoroState,
}) => {
  const { isUseLongBreaks } = useGameStateContext();

  return (
    <ul className={styles.indicators}>
      <li className={`${styles.indicator} ${pomodoroState === 'FOCUS' ? styles.indicatorActive : ''}`}>Focus</li>
      <li className={`${styles.indicator} ${pomodoroState === 'SHORT_BREAK' ? styles.indicatorActive : ''}`}>
        Short break
      </li>
      {
        isUseLongBreaks && (
          <li className={`${styles.indicator} ${pomodoroState === 'LONG_BREAK' ? styles.indicatorActive : ''}`}>
            Long break
          </li>
        )
      }
    </ul>
  );
};
