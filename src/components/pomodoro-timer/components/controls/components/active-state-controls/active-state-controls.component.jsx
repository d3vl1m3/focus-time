import React from 'react';
import { useTimerStateContext, useControlActionsContext } from '../../../../contexts';

export const ActiveStateControls = () => {
  const { isPaused } = useTimerStateContext();
  const { controlActionReducer } = useControlActionsContext();

  return (
    <>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => controlActionReducer({ type: 'RESET' })}
      >
        Reset
      </button>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => controlActionReducer({ type: isPaused ? 'START' : 'PAUSE' })}
      >
        {isPaused ? 'Resume' : 'Pause'}
      </button>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => controlActionReducer({ type: 'SKIP' })}
      >
        Skip
      </button>
    </>
  );
};
