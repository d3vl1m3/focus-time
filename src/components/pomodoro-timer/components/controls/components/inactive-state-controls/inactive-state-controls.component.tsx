import {VoidFunctionComponent} from 'react';
import {useControlActionsContext} from '../../../../contexts';

export const InactiveStateControl: VoidFunctionComponent = () => {
  const {controlActionReducer} = useControlActionsContext();
  return (
    <button
      className="btn btn-primary"
      type="button"
      onClick={() => controlActionReducer({type: 'START'})}
    >
      Start
    </button>
  );
};
