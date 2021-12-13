import styles from './controls.module.css';
import { useGameStateContext, useTimerStateContext } from '../../contexts';
import {
  ActiveStateControls,
  CompletedStateControls,
} from './components';
import { InactiveStateControl } from './components/inactive-state-controls/inactive-state-controls.component';

export const Controls = () => {
  const { isCompleted } = useGameStateContext();
  const { isActive } = useTimerStateContext();

  return (
    <div className={styles.container}>
      {isCompleted && <CompletedStateControls />}
      {!isCompleted && isActive && <ActiveStateControls />}
      {!isCompleted && !isActive && <InactiveStateControl />}
    </div>
  );
};
