import { useTimerStateContext } from '@contexts';
import { useControlActions } from '@hooks';
import { VoidFunctionComponent } from 'react';

import type { ActionButtonComponentProps } from '../../controls.component';
import styles from '../../controls.module.css';

export const ActiveStateControls: VoidFunctionComponent<ActionButtonComponentProps> = () => {
  const { isPaused } = useTimerStateContext();
  const { controlActionReducer } = useControlActions();

  return (
    <>
      <button
        className={`btn btn-primary ${styles.controls}`}
        type="button"
        onClick={() => controlActionReducer({ type: isPaused ? 'START' : 'PAUSE' })}
      >
        {isPaused ? 'Resume timer' : 'Pause timer'}
      </button>
      <button
        className={`btn btn-secondary ${styles.controls}`}
        type="button"
        onClick={() => controlActionReducer({ type: 'SKIP' })}
      >
        Skip interval
      </button>
      <button
        className={`btn btn-danger ${styles.controls} ${styles.resetControl}`}
        type="button"
        onClick={() => controlActionReducer({ type: 'RESET' })}
      >
        Reset Pomodoro session
      </button>
    </>
  );
};
