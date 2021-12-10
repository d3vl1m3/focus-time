import React from 'react';
import { useControlActionsContext } from '../../../../contexts';

export const InactiveStateControl = () => {
  const { controlActionReducer } = useControlActionsContext();
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => controlActionReducer({ type: 'START' })}
    >
      Start
    </button>
  );
};
