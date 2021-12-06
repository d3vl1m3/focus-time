import React from 'react';
import styles from '../../controls.module.css';
import { useControlActionsContext } from '../../../../context/control-actions/control-actions.context';

export const CompletedStateControlsComponent = () => {
  const { controlActionReducer } = useControlActionsContext();
  return (
    <button
      className={`${styles.timerControl} ${styles.timerControlPrimary}`}
      type="button"
      onClick={() => controlActionReducer({ type: 'RESET' })}
    >
      Reset
    </button>
  );
};
