import {VoidFunctionComponent} from 'react';
import {useControlActionsContext} from '../../../../contexts';

export const CompletedStateControls: VoidFunctionComponent = () => {
  const {controlActionReducer} = useControlActionsContext();
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => controlActionReducer({type: 'RESET'})}
    >
      Reset
    </button>
  );
};
