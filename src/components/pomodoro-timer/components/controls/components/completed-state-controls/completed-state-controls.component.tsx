import { useControlActions } from '@hooks';
import { VoidFunctionComponent } from 'react';

import type { ActionButtonComponentProps } from '../../controls.component';
import styles from '../../controls.module.css';

export const CompletedStateControls: VoidFunctionComponent<ActionButtonComponentProps> = () => {
  const { controlActionReducer } = useControlActions();

  return (
    <button
      className={`btn btn-primary ${styles.controls}`}
      type="button"
      onClick={() => controlActionReducer({ type: 'RESET' })}
    >
      Start a new session
    </button>
  );
};
