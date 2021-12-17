import {VoidFunctionComponent} from 'react';
import {useTimerStateContext, useControlActionsContext} from '../../../../contexts';

import styles from './active-state-controls.module.css'

interface ActiveStateControlsProps {
  btnClasses?: string
}

export const ActiveStateControls: VoidFunctionComponent<ActiveStateControlsProps> = ({btnClasses = ''}) => {
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
        className={`btn btn-secondary ${btnClasses}`} type="button"
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
