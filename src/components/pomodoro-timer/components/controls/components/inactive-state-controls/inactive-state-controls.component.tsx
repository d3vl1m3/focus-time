import { useControlActions } from '@hooks';
import { VoidFunctionComponent } from 'react';

import type { ActionButtonComponentProps } from '../../controls.component';
import styles from '../../controls.module.css';

export const InactiveStateControls: VoidFunctionComponent<ActionButtonComponentProps> = () => {
  const { controlActionReducer } = useControlActions();

  return (
    <button
      className={`btn btn-primary ${styles.controls}`}
      type="button"
      onClick={() => controlActionReducer({ type: 'START' })}
    >
      Start a Pomodoro session
    </button>
  );
};
