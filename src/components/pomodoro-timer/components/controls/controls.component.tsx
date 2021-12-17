import styles from './controls.module.css';
import {useGameStateContext, useTimerStateContext} from '../../contexts';
import {
  ActiveStateControls,
  CompletedStateControls,
} from './components';
import {InactiveStateControl} from './components/inactive-state-controls/inactive-state-controls.component';

export const Controls = () => {
  const {isCompleted} = useGameStateContext();
  const {isActive} = useTimerStateContext();

  return (
    <div className={styles.container}>
      {!isCompleted && !isActive && <InactiveStateControl btnClasses={styles.controls}/>}
      {!isCompleted && isActive && <ActiveStateControls btnClasses={styles.controls}/>}
      {isCompleted && <CompletedStateControls btnClasses={styles.controls}/>}
    </div>
  );
};
