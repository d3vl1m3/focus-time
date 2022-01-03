import {
  useGameStateContext,
  useTimerStateContext,
} from '@contexts';

import {
  ActiveStateControls,
  CompletedStateControls,
  InactiveStateControls,
} from './components';
import styles from './controls.module.css';

export interface ActionButtonComponentProps {
  btnClasses?: string;
}

export const Controls = () => {
  const { isCompleted } = useGameStateContext();
  const { isActive } = useTimerStateContext();

  return (
    <div
      aria-controls="timer"
      className={styles.container}
      role="group"
    >
      {!isCompleted && !isActive &&
          <InactiveStateControls btnClasses={styles.controls}/>}
      {!isCompleted && isActive &&
          <ActiveStateControls btnClasses={styles.controls}/>}
      {isCompleted &&
          <CompletedStateControls btnClasses={styles.controls}/>}
    </div>
  );
};
