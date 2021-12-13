import {PomodoroStateType} from "../../../../types/pomodoro-state/pomodoro-state.type";
import styles from './pomodoro-state-indicator.module.css';
import {useGameStateContext} from '../../contexts';
import {VoidFunctionComponent} from 'react';

type PomodoroStateIndicatorPresenterProps = {
  pomodoroState: PomodoroStateType
}

export const PomodoroStateIndicatorPresenter: VoidFunctionComponent<PomodoroStateIndicatorPresenterProps> = ({pomodoroState}) => {
  const {isUseLongBreaks} = useGameStateContext();

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
