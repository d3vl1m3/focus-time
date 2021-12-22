import {VoidFunctionComponent} from 'react';
import {useControlActionsContext, useTimerStateContext} from '../../../../contexts';
import {ActionButtonComponentProps} from '../../controls.component';

import styles from './active-state-controls.module.css';

export const ActiveStateControls: VoidFunctionComponent<ActionButtonComponentProps> = ({
  btnClasses = '',
}) => {
  const {isPaused} = useTimerStateContext();
  const {controlActionReducer} = useControlActionsContext();

  return (
    <>
      <button
        className={`btn btn-primary ${btnClasses}`}
        type="button"
        onClick={() => controlActionReducer({type: isPaused ? 'START' : 'PAUSE'})}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button
        className={`btn btn-secondary ${btnClasses}`}
        type="button"
        onClick={() => controlActionReducer({type: 'SKIP'})}
      >
        Skip
      </button>
      <button
        className={`btn btn-danger ${btnClasses} ${styles.resetControl}`}
        type="button"
        onClick={() => controlActionReducer({type: 'RESET'})}
      >
        Reset
      </button>
    </>
  );
};
