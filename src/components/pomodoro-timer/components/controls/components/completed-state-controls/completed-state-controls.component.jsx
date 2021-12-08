import React from 'react';
import { useControlActionsContext } from '../../../../contexts';

export const CompletedStateControls = () => {
  const { controlActionReducer } = useControlActionsContext();
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => controlActionReducer({ type: 'RESET' })}
    >
      Reset
    </button>
  );
};
