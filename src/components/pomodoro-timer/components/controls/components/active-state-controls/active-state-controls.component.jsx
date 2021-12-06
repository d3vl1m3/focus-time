import React from 'react';
import styles from '../../controls.module.css';
import { useTimerStateContext } from '../../../../context/timer-state/timer-state.context';
import { useControlActionsContext } from '../../../../context/control-actions/control-actions.context';

export const ActiveStateControlsComponent = () => {
  const {
    isActive,
    isPaused,
  } = useTimerStateContext();

  const { controlActionReducer } = useControlActionsContext();

  return (
    isActive ? (
      <div>
        <button
          className={`${styles.timerControl} ${styles.timerControlSecondary}`}
          type="button"
          onClick={() => controlActionReducer({ type: 'RESET' })}
        >
          Reset
        </button>
        <button
          className={`${styles.timerControl} ${styles.timerControlPrimary}`}
          type="button"
          onClick={() => controlActionReducer({ type: isPaused ? 'START' : 'PAUSE' })}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        <button
          className={`${styles.timerControl} ${styles.timerControlSecondary}`}
          type="button"
          onClick={() => controlActionReducer({ type: 'SKIP' })}
        >
          Skip
        </button>
      </div>
    ) : (
      <button
        className={`${styles.timerControl} ${styles.timerControlPrimary}`}
        type="button"
        onClick={() => controlActionReducer({ type: 'START' })}
      >
        Start
      </button>
    )
  );
};
